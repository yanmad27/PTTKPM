var express = require('express');
var roomModel = require('../models/room.model');
var dealModel = require('../models/deal.model');
var auth = require('../middlewares/auth');
var router = express.Router();

router.get('/:id/rooms', (req, res, next) => {
    var id = req.params.id;
    var page = req.query.page || 1; //lấy dữ liệu trên URL sau '?'
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        roomModel.pageByArea(id, limit, offset),
        roomModel.countByArea(id),
        roomModel.partOfRoomsById(id),
    ]).then(([rows, count_rows, parts]) => {
        console.log(rows);
        console.log(count_rows);
        console.log(parts);
        for (const kv of res.locals.lcAreas) {
            if (kv.id === +id) {
                kv.isActive = true;
            }
        }

        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);//lấy giá trị nhỏ hơn gần nhất
        if (total % limit > 0) nPages++;
        var pages = [];
        for (let i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page }; //+page = page.parseInt()
            pages.push(obj);
        }

        res.render('vwRooms/byArea', {
            Rooms: rows,
            Pages: pages,
            Parts: parts
        });
    }).catch(next);
});

router.get('/:idArea/rooms/:idRoom', (req, res, next) => {
    var id = req.params.idRoom;
    var idArea = req.params.idArea;
    if (isNaN(id) || isNaN(idArea)) {
        res.render('vwRooms/detail', {
            error: true
        });
    }

    roomModel.single(id).then(rows => {
        if (rows.length > 0) {
            var area;

            res.locals.lcAreas.forEach(item => {
                if (item.id === +idArea) {
                    area = item;
                }
            });

            res.render('vwRooms/detail', {
                error: false,
                room: rows[0],
                area: area
            });
        } else {
            res.render('vwRooms/detail', {
                error: true
            });
        }
    }).catch(next);
});

router.get('/:idArea/rooms/:idRoom/checkout', auth.notLogin, (req, res, next) => {
    var idArea = req.params.idArea;
    var idRoom = req.params.idRoom;
    if (isNaN(idRoom) || isNaN(idArea)) {
        res.render('vwRooms/checkout', {
            error: true,
            layout: false
        });
    }

    roomModel.single(idRoom).then(rows => {
        if (rows.length > 0) {
            res.render('vwRooms/checkout', {
                error: false,
                area: idArea,
                room: rows[0],
                layout: false
            });
        } else {
            res.render('vwRooms/checkout', {
                error: true,
                layout: false
            });
        }
    }).catch(next);
})

router.post('/checkout', (req, res, next) => {
    var entity = {
        renter_id: req.user.id,
        lessor_id: req.body.lessor_id,
        room_id: req.body.room_id,
        price: req.body.price,
        note: req.body.note,
    };

    console.log(entity);
    dealModel.add(entity).then(id => {
        res.redirect('/');
    })
})

router.post('/search', (req, res, next) => {
    var entity = req.body.search;

    var page = req.query.page || 1; //lấy dữ liệu trên URL sau '?'
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        roomModel.search(entity, limit, offset),
        roomModel.countSearch(entity),
    ]).then(([rows, count_rows]) => {
        if (rows.length > 0) {

            var total = count_rows[0].total;
            var nPages = Math.floor(total / limit);//lấy giá trị nhỏ hơn gần nhất
            if (total % limit > 0) nPages++;
            var pages = [];
            for (let i = 1; i <= nPages; i++) {
                var obj = { value: i, active: i === +page }; //+page = page.parseInt()
                pages.push(obj);
            }

            res.render('vwRooms/search', {
                rooms: rows,
                pages: pages,
                error: false
            });
        } else {
            res.render('vwRooms/search', {
                error: true
            });
        }
    }).catch(next);
});

module.exports = router;