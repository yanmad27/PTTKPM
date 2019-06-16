var roomModel = require('../models/room.model');
module.exports = (req, res, next) => {
    var page = req.query.page || 1; //lấy dữ liệu trên URL sau '?'
    if (page < 1) page = 1;

    var limit = 6;
    var offset = (page - 1) * limit;

    Promise.all([
        roomModel.pageAll(limit, offset),
        roomModel.countAll(),
        roomModel.partOfRooms(),
    ]).then(([rows, count_rows, parts]) => {
        var total = count_rows[0].total;
        var nPages = Math.floor(total / limit);//lấy giá trị nhỏ hơn gần nhất
        if (total % limit > 0) nPages++;
        var pages = [];
        for (let i = 1; i <= nPages; i++) {
            var obj = { value: i, active: i === +page }; //+page = page.parseInt()
            pages.push(obj);
        }
        res.locals.lcRooms = rows;
        res.locals.lcPages = pages;
        res.locals.lcParts = parts;
        next();
    }).catch(next);
}
