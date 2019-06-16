var areaModel = require('../models/area.model');

module.exports = (req, res, next) => {
    areaModel.allWithDetail().then(rows => {
        res.locals.lcAreas = rows;
        next();
    });
}
