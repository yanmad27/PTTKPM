var express = require('express');
var roomModel = require('../../models/room.model');

var auth = require('../../middlewares/auth');
var upload = require('../../middlewares/upload');

var router = express.Router();

router.get('/', auth, (req, res, next) => {
    roomModel.all()
        .then(rows => {
            res.render('vwAccount/admin/vwRooms/index', {
                rooms: rows,
                layout: false
            });
        }).catch(next);
})

router.get('/add', auth, (req, res) => {
    res.render('vwAccount/admin/vwRooms/add', { layout: false });
})

router.post('/add', auth, (req, res, next) => {
    upload.single('HinhAnh')(req, res, err => {
        if (err) {
            return res.json({
                error: err.message
            });
        }

        var entity = {
            idPhong: req.body.idPhong,
            TenPhong: req.body.TenPhong,
            DiaChi: req.body.DiaChi,
            HinhAnh: '/images/home/' + req.file.filename,
            MoTa: req.body.MoTa,
            GiaBan: req.body.GiaBan,
            idKhuVuc: req.body.idKhuVuc
        };

        roomModel.add(entity).then(id => {
            res.redirect('/admin/rooms');
        }).catch(next);
    })
})

router.get('/edit/:id', auth, (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwAccount/admin/vwRooms/edit', {
            error: true,
            layout: false
        });
    }

    roomModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('vwAccount/admin/vwRooms/edit', {
                error: false,
                room: rows[0],
                layout: false,
                helpers: {
                    forEq: function (arg1, arg2, options) {
                        var rs = '<select name="idKhuVuc" class="form-control sedang">';
                        arg2.forEach(item => {
                            if (arg1.idKhuVuc === item.idKhuVuc)
                                rs += '<option selected value="' + options.fn(item.idKhuVuc) + '">' + options.fn(item.TenKhuVuc) + '</option>';
                            else
                                rs += '<option value="' + options.fn(item.idKhuVuc) + '">' + options.fn(item.TenKhuVuc) + '</option>';
                        });
                        return rs + '</select>'
                    }
                }
            });
        } else {
            res.render('vwAccount/admin/vwRooms/edit', {
                layout: false,
                error: true
            });
        }
    }).catch(next);
})

router.post('/update', auth, (req, res, next) => {
    upload.single('HinhAnh')(req, res, err => {
        if (err) {
            return res.json({
                error: err.message
            });
        }

        var entity = {
            idPhong: req.body.idPhong,
            TenPhong: req.body.TenPhong,
            DiaChi: req.body.DiaChi,
            HinhAnh: '/images/home/' + req.file.filename,
            MoTa: req.body.MoTa,
            GiaBan: req.body.GiaBan,
            idKhuVuc: req.body.idKhuVuc
        };

        roomModel.update(entity).then(n => {
            res.redirect('/admin/rooms');
        }).catch(next);
    })
})

router.post('/delete', auth, (req, res, next) => {
    roomModel.delete(req.body.idPhong).then(n => {
        res.redirect('/admin/rooms');
    }).catch(next);
})


module.exports = router;
