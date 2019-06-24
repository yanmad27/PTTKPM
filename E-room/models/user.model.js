var db = require('../utils/db');

module.exports = {

  add: entity => {
    return db.add('user', entity).then(newid => {
      var sql = `INSERT INTO user_role(user_id, role_id) VALUES (${newid},3)`;
      db.load(sql);
    })
  },
  singleByUserName: userName => {
    return db.load(`select * from user where username='${userName}'`);
  },
  singleByEmail: email => {
    return db.load(`select * from user where email = '${email}'`);
  },
  singleById: id => {
    return db.load(`select * from user where id = '${id}'`);
  },
  update: entity => {
    return db.update('user', 'id', entity);
  },

  updateByUsername: (entity) => {
    return db.update('user', 'username', entity);
  },
  all: () => {
    return db.load('select * from user');
  },

  single: id => {
    return db.load(`select * from user where id = ${id}`);
  },

  // singleByUserName: userName => {
  //   return db.load(`select * from KHACHHANG where TenDangNhap = '${userName}'`);
  // },

  // singleByEmail: email => {
  //   return db.load(`select * from KHACHHANG where Email = '${email}'`);
  // },

  // singleById: id => {
  //   return db.load(`select * from KHACHHANG where idKHACHHANG = '${id}'`);
  // },

  // add: entity => {
  //   return db.add('khachhang', entity);
  // },

  // update: entity => {
  //   return db.update('KHACHHANG', 'idKHACHHANG', entity);
  // },

  // delete: id => {
  //   return db.delete('KHACHHANG', 'idKHACHHANG', id);
  // },

  // updateByUsername: (entity) => {
  //   return db.update('khachhang', 'TenDangNhap', entity);
  // },
};
