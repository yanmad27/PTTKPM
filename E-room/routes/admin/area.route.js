var express = require('express');
var areaModel = require('../../models/area.model');


var router = express.Router();

router.get('/', (req, res, next) => {
    areaModel.all()
        .then(rows => {
            res.render('vwAccount/admin/vwAreas/index', {
                areas: rows,
                layout: false
            });
        }).catch(next);
})

router.get('/add', (req, res) => {
    res.render('vwAccount/admin/vwAreas/add', { layout: false });
})

router.post('/add', (req, res, next) => {
    areaModel.add(req.body).then(id => {
        res.redirect('/admin/areas');
    }).catch(next);
})

router.get('/edit/:id', (req, res, next) => {
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

router.post('/update', (req, res, next) => {
    var entity = {
        idKhuVuc: req.body.idKhuVuc,
        TenKhuVuc: req.body.TenKhuVuc
    };

    areaModel.update(entity).then(n => {
        res.redirect('/admin/areas');
    }).catch(next);
})

router.post('/delete', (req, res, next) => {
    areaModel.delete(req.body.idKhuVuc).then(n => {
        res.redirect('/admin/areas');
    }).catch(next);
})


module.exports = router;
