var express = require('express');
var areaModel = require('../../models/area.model');

var auth = require('../../middlewares/auth');

var router = express.Router();

router.get('/', auth, (req, res, next) => {
    areaModel.all()
        .then(rows => {
            res.render('vwAccount/admin/vwAreas/index', {
                areas: rows,
                layout: false
            });
        }).catch(next);
})

router.get('/add', auth, (req, res) => {
    res.render('vwAccount/admin/vwAreas/add', { layout: false });
})

router.post('/add', auth, (req, res, next) => {
    areaModel.add(req.body).then(id => {
        res.redirect('/admin/areas');
    }).catch(next);
})

router.get('/edit/:id', auth, (req, res, next) => {
    var id = req.params.id;
    if (isNaN(id)) {
        res.render('vwAccount/admin/vwAreas/edit', {
            error: true,
            layout: false
        });
    }

    areaModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('vwAccount/admin/vwAreas/edit', {
                error: false,
                area: rows[0],
                layout: false
            });
        } else {
            res.render('vwAccount/admin/vwAreas/edit', {
                layout: false,
                error: true
            });
        }
    }).catch(next);
})

router.post('/update', auth, (req, res, next) => {
    var entity = {
        idKhuVuc: req.body.idKhuVuc,
        TenKhuVuc: req.body.TenKhuVuc
    };

    areaModel.update(entity).then(n => {
        res.redirect('/admin/areas');
    }).catch(next);
})

router.post('/delete', auth, (req, res, next) => {
    areaModel.delete(req.body.idKhuVuc).then(n => {
        res.redirect('/admin/areas');
    }).catch(next);
})


module.exports = router;
