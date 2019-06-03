var areaModel = require('../models/area.model');
module.exports = (rep, res, next) => {
    areaModel.allWithDetail().then(rows => {
        res.local.lcAreas = rows;
        next();
    });
}
