var express = require('express');
var bcrypt = require('bcrypt');
var userModel = require('../../models/user.model');
var dealModel = require('../../models/deal.model');
var passport = require('passport');
var auth = require('../../middlewares/auth');
var Cryptr = require('cryptr');
var cryptr = new Cryptr('titom');
var upload = require('../../middlewares/upload');
var router = express.Router();

router.get('/is-available', (req, res, next) => {
    var user = req.query.username;
    userModel.singleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }

        return res.json(true);
    })
})

router.get('/is-username', (req, res, next) => {
    var user = req.query.username;
    userModel.singleByUserName(user).then(rows => {
        if (rows.length > 0) {
            return res.json(true);
        }

        return res.json(false);
    })
})

//check email
router.get('/is-available-email', (req, res, next) => {
    var email = req.query.email;
    userModel.singleByEmail(email).then(rows => {
        if (rows.length > 0) {
            return res.json(false);
        }

        return res.json(true);
    })
})

router.get('/is-email', (req, res, next) => {
    var email = req.query.email;
    userModel.singleByEmail(email).then(rows => {
        if (rows.length > 0) {
            return res.json(true);
        }

        return res.json(false);
    })
})

router.get('/register', (req, res, next) => {
    res.render('vwAccount/register', { layout: false });
})

router.post('/register', (req, res, next) => {
    var saltRounds = 10; //tạo key ảo để nối vào password => hash
    var hash = bcrypt.hashSync(req.body.password, saltRounds);

    var entity = {
        fullname: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        username: req.body.username,
        password: hash,
    };
    console.log(entity);

    userModel.add(entity).then(id => {
        res.redirect('/account/login');
    })
})

router.get('/login', (req, res, next) => {
    res.render('vwAccount/login', { layout: false });
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            return res.render('vwAccount/login', {
                layout: false,
                err_message: info.message
            })
        }

        req.logIn(user, err => {
            if (err)
                return next(err);

            return res.redirect('/');
        });
    })(req, res, next);
})

router.get('/profile/:id', auth.notLogin, (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwAccount/profile', {
            layout: false,
            error: true
        });
    }

    userModel.singleById(id).then(rows => {
        if (rows.length > 0) {
            res.render('vwAccount/profile', {
                error: false,
                layout: false,
                cus: rows[0]
            });
        } else {
            res.render('vwAccount/profile', {
                layout: false,
                error: true
            });
        }
    }).catch(next);
})

router.post('/update', auth.notLogin, (req, res, next) => {
    var entity = {
        id: req.body.id,
        fullname: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address
    };
    console.log(entity);

    userModel.update(entity).then(id => {
        res.redirect('/');
    }).catch(next);
})

router.get('/history/:id', auth.notLogin, (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwAccount/history', {
            layout: false,
            error: true
        });
    }

    dealModel.singleByIdRenter(id).then(rows => {

        if (rows.length > 0) {
            res.render('vwAccount/history', {
                error: false,
                layout: false,
                rooms: rows
            });
        } else {
            res.render('vwAccount/history', {
                layout: false,
                error: true
            });
        }
    }).catch(next);
})

router.post('/logout', auth.notLogin, (req, res, next) => {
    req.logOut();
    res.redirect('/account/login');
})

//change password
router.get('/changepass', auth.notLogin, (req, res, next) => {
    res.render('vwAccount/changepass');
})

router.post('/updatepass', auth.notLogin, (req, res, next) => {
    var pass = req.user.MatKhau;
    var oldpass = req.body.oldpassword;

    var ret = bcrypt.compareSync(oldpass, pass);
    console.log(ret);
    if (!ret) {
        return res.render('vwAccount/changepass', {
            err_message: 'Invalid Password.'
        })
    }

    var saltRounds = 10; //tạo key ảo để nối vào password => hash
    var hash = bcrypt.hashSync(req.body.newpassword, saltRounds);
    var entity = {
        idKHACHHANG: req.user.idKHACHHANG,
        MatKhau: hash,
    };

    userModel.update(entity).then(id => {
        req.logOut();
        res.redirect('/account/login');
    }).catch(next);
})


/* Forget Password */
router.get('/forgotpass', auth.inLogin, (req, res, next) => {
    res.render('vwAccount/forgot', { layout: false });
})


//send email get OTP
router.post('/sendmail', auth.inLogin, (req, res, next) => {
    var email = req.body.email;
    var username = req.body.username;
    var hash = cryptr.encrypt(username);

    var nodemailer = require('nodemailer');
    console.log(hash);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'vngchatservice@gmail.com',
            pass: 'vng123456'
        }
    });
    var mailOptions = {
        from: 'vngchatservice@gmail.com',
        to: email,
        subject: 'Confirm password',
        html: '<h1>Welcome</h1><p>E-room!</p>'
            + '<p>Your default password is <b>123456</b><p>'
            + '<p>Please access this site to confirm password: <a href=http://localhost:8000/account/confirm/' + hash + '>'
            + 'eroom.tk</a>'
            + '<p>Have a nice day!</p>'
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.redirect('/account/login');
})

//confirm reset password to 123456
router.get('/confirm/:username', auth.inLogin, (req, res, next) => {
    var saltRounds = 10; //tạo key ảo để nối vào password => hash
    var hash = bcrypt.hashSync('123456', saltRounds);

    var username = cryptr.decrypt(req.params.username);

    var entity = {
        username: username,
        password: hash,
    };

    userModel.updateByUsername(entity).then(id => {
        res.redirect('/account/login');
    }).catch(next);
})

//upload room
router.get('/post', auth.notLogin,auth.isLessor, (req, res, next) => {
    res.render('vwAccount/upload');
})

router.post('/post', (req, res, next) => {
    var roommodel = require('../../models/room.model');
    upload.single('image')(req, res, err => {
        if (err) {
            return res.json({
                error: err.message
            });
        }
        var image;
        console.log(req.file);
        if (req.file)
            image = '/images/home/' + req.file.filename;

        req.body.user_id = res.locals.authUser.id;
        req.body.image = image;
        console.log(req.body);
        roommodel.add(req.body).then(id => {
            res.render('vwAccount/success');
        }).catch(next);
    })
})

router.get('/uploadedroom', auth.notLogin,auth.isLessor, (req,res,next)=>{
    var roommodel= require('../../models/room.model');
    roommodel.allByUserId(req.user.id).then(rows=>{
        res.render('vwAccount/uploaded', {
            dataroom:rows,
        });

    })


})

module.exports = router;