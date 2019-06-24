var db = require('../utils/db');

module.exports = {
  singleByIdRenter: id => {
    return db.load(`select d.renter_id, d.lessor_id, u.fullname as lessor_name, d.room_id, r.name as room_name, r.district_id as district_id,r.image, d.price, d.note from deal d
    JOIN user u on u.id = d.lessor_id
      JOIN room r on r.id = d.room_id
  where d.renter_id=${id}`);
  },

  add: entity => {
    return db.add('deal', entity);
  },

  // all: () => {
  //   return db.load('select * from NGUOIGIAODICH');
  // },

  // single: id => {
  //   return db.load(`select * from NGUOIGIAODICH where idNGUOIGD = ${id}`);
  // },

  // singleById: id => {
  //   return db.load(`select * from NGUOIGIAODICH where idNGUOIGD = '${id}'`);
  // },

  // singleByIdKH: id => {
  //   return db.load(`select * from NGUOIGIAODICH where idKHACHHANG = '${id}'`);
  // },

  // add: entity => {
  //   return db.add('NGUOIGIAODICH', entity);
  // },

  // update: entity => {
  //   return db.update('NGUOIGIAODICH', 'idNGUOIGD', entity);
  // },

  // delete: id => {
  //   return db.delete('NGUOIGIAODICH', 'idNGUOIGD', id);
  // }
};
