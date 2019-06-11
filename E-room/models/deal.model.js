var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from NGUOIGIAODICH');
  },

  single: id => {
    return db.load(`select * from NGUOIGIAODICH where idNGUOIGD = ${id}`);
  },

  singleById: id => {
    return db.load(`select * from NGUOIGIAODICH where idNGUOIGD = '${id}'`);
  },

  singleByIdKH: id => {
    return db.load(`select * from NGUOIGIAODICH where idKHACHHANG = '${id}'`);
  },

  add: entity => {
    return db.add('NGUOIGIAODICH', entity);
  },

  update: entity => {
    return db.update('NGUOIGIAODICH', 'idNGUOIGD', entity);
  },

  delete: id => {
    return db.delete('NGUOIGIAODICH', 'idNGUOIGD', id);
  }
};
