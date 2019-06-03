var express = require('express');
var roomModel = require('../models/room.model');

var router = express.Router();

router.get('/:id/rooms', (req, res, next) => {
    var id = req.params.id;
    var page = req.query.page || 1; //lấy dữ liệu trên URL sau '?'
    if (page < 1) page = 1;

    var limit = 9;
    var offset = (page - 1) * limit;

    Promise.all([
        roomModel.pageAll(limit, offset),
        roomModel.countAll(),
        roomModel.partOfRoomsById(id),
    ]).then(([rows, count_rows, parts]) => {
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
    if (isNaN(id)) {
        res.render('vwRooms/detail', {
            error: true
        });
    }

    roomModel.single(id).then(rows => {
        if (rows.length > 0) {
            res.render('vwRooms/detail', {
                error: false,
                room: rows[0],
                area: idArea
            });
        } else {
            res.render('vwRooms/detail', {
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;