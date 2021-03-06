var mysql = require("mysql");
var createConnection = () => {
  return mysql.createConnection({
    host: "112.197.2.178",
    port: 3306,
    user: "administrator",
    password: "P8Cv1lDlHTCtJW5u",
    database: "mhhpm"
  });
};

module.exports = {
  nextId: tableName => {
    //xử lý đồng bộ - promise
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();

      var sql = `SELECT AUTO_INCREMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'newsdb' AND TABLE_NAME = '${tableName}'`;
      connection.query(sql, (error, results, fields) => {
        if (error) throw reject(error);
        else resolve(results);
        connection.end();
      });
    });
  },
  load: sql => {
    //xử lý đồng bộ - promise
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect(error => {
        if (error) throw error;
      });
      connection.query(sql, (error, results, fields) => {
        if (error) throw reject(error);
        else resolve(results);
        connection.end();
      });
    });
  },

  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      var sql = `INSERT INTO ${tableName} SET ?`;
      connection.query(sql, entity, (error, results, fields) => {
        if (error) throw reject(error);
        else {
          resolve(results.insertId); //resolve(value.insertID) tự động tăng ID
        }
        connection.end();
      });
    });
  },

  update: (tableName, idField, entity) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      var id = entity[idField]; //gán giá trị ID
      delete entity[idField]; //xóa giá trị ID trong json Category
      var sql = `update ${tableName} SET ? WHERE ${idField} = ?`;
      connection.query(sql, [entity, id], (error, value) => {
        if (error) {
          console.log(error);
          throw reject(error);
        } else resolve(value.changedRows); //resolve(value.insertID) tự động tăng ID
        connection.end();
      });
    });
  },

  delete: (tableName, idField, id) => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();
      var sql = `delete from ${tableName} where ${idField} = ?`;
      connection.query(sql, id, (error, value) => {
        if (error) throw reject(error);
        else resolve(value.affectedRows); //resolve(value.insertID) tự động tăng ID
        connection.end();
      });
    });
  }
};
