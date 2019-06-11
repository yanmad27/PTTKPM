var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from KHACHHANG');
  },

  single: id => {
    return db.load(`select * from KHACHHANG where idKHACHHANG = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from KHACHHANG where TenDangNhap = '${userName}'`);
  },

  singleById: id => {
    return db.load(`select * from KHACHHANG where idKHACHHANG = '${id}'`);
  },

  add: entity => {
    return db.add('khachhang', entity);
  },

  update: entity => {
    return db.update('KHACHHANG', 'idKHACHHANG', entity);
  },

  delete: id => {
    return db.delete('KHACHHANG', 'idKHACHHANG', id);
  }
};