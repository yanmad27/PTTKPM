var express = require('express');
var bcrypt = require('bcrypt');
var userModel = require('../../models/user.model');
var dealModel = require('../../models/deal.model');
var passport = require('passport');
var auth = require('../../middlewares/auth');

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

router.get('/register', (req, res, next) => {
    res.render('vwAccount/register', { layout: false });
})

router.post('/register', (req, res, next) => {
    var saltRounds = 10; //tạo key ảo để nối vào password => hash
    var hash = bcrypt.hashSync(req.body.password, saltRounds);

    var entity = {
        TenKH: req.body.name,
        Email: req.body.email,
        DiaChi: req.body.address,
        SDT: req.body.phone,
        TenDangNhap: req.body.username,
        MatKhau: hash,
        Quyen: 0
    };

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

router.get('/profile/:id', auth, (req, res, next) => {
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

router.post('/update', auth, (req, res, next) => {
    var entity = {
        idKHACHHANG: req.body.id,
        TenKH: req.body.name,
        Email: req.body.email,
        SDT: req.body.phone,
        DiaChi: req.body.address
    };

    userModel.update(entity).then(id => {
        res.redirect('/');
    }).catch(next);
})

router.get('/history/:id', auth, (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwAccount/history', {
            layout: false,
            error: true
        });
    }

    dealModel.singleByIdKH(id).then(rows => {
        var rooms = [];
        rows.forEach(item => {
            for (let index = 0; index < res.locals.lcRooms.length; index++) {
                if (item.idPhong === res.locals.lcRooms[index].idPhong){
                    res.locals.lcRooms[index].TenNguoiGD = item.TenNguoiGD;
                    rooms.push(res.locals.lcRooms[index]);
                    break;
                }
            }
        });

        if (rows.length > 0) {
            res.render('vwAccount/history', {
                error: false,
                layout: false,
                rooms: rooms
            });
        } else {
            res.render('vwAccount/history', {
                layout: false,
                error: true
            });
        }
    }).catch(next);
})

router.post('/logout', auth, (req, res, next) => {
    req.logOut();
    res.redirect('/account/login');
})

module.exports = router;