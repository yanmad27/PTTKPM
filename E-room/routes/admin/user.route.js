var express = require('express');
var userModel = require('../../models/user.model');


var router = express.Router();

router.get('/', (req, res, next) => {
    userModel.all()
        .then(rows => {
            for (let index = 0; index < rows.length; index++) {
                if (rows[index].Quyen === 0) {
                    rows[index].Role = 'Customer'
                }
                else {
                    rows[index].Role = 'Admin'
                }
            }
            res.render('vwAccount/admin/vwUsers/index', {
                users: rows,
                layout: false
            });
        }).catch(next);
})

router.get('/edit/:id', (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwAccount/admin/vwUsers/edit', {
            error: true,
            layout: false
        });
    }

    userModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('vwAccount/admin/vwUsers/edit', {
                error: false,
                user: rows[0],
                layout: false,
                helpers: {
                    ifEq: function (arg1, options) {
                        var rs = '<select name="Quyen" class="form-control sedang">';
                        if (arg1.Quyen === 0) {
                            rs += '<option selected value="0">Customer</option>';
                            rs += '<option value="1">Admin</option>';
                        }
                        else {
                            rs += '<option selected value="1">Admin</option>';
                            rs += '<option value="0">Customer</option>';
                        }
                        return rs + '</select>'
                    }
                }
            });
        } else {
            res.render('vwAccount/admin/vwUsers/edit', {
                layout: false,
                error: true
            });
        }
    }).catch(next);
})

router.post('/update', (req, res, next) => {
    var entity = {
        idKHAHHANG: req.body.idKHAHHANG,
        TenKH: req.body.TenKH,
        DiaChi: req.body.DiaChi,
        Email: req.body.Email,
        SDT: req.body.SDT,
        Quyen: +req.body.Quyen
    };

    userModel.update(req.body).then(n => {
        res.redirect('/admin/users');
    }).catch(next);
})

router.post('/delete', (req, res, next) => {
    userModel.delete(req.body.idKHACHHANG).then(n => {
        res.redirect('/admin/users');
    }).catch(next);
})


module.exports = router;
