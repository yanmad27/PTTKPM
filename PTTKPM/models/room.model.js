var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from PHONG order by idPhong DESC');
    },

    partOfRooms: () =>{
        return db.load('select * from PHONG where idPhong <= 5');
    },

    partOfRoomsById: (idKhuVuc) =>{
        return db.load(`select * from PHONG where idKhuVuc = ${idKhuVuc} and idPhong <= 5`);
    },

    pageAll: (limit, offset) => {
        return db.load(`select * from PHONG order by idPhong DESC limit ${limit} offset ${offset}`);
    },

    countAll: () => {
        return db.load(`select count(*) as total from PHONG`);
    },

    allByArea: idKhuVuc => {
        return db.load(`select * from PHONG where idKhuVuc = ${idKhuVuc} order by idPhong DESC` );
    },

    pageByArea: (idKhuVuc, limit, offset) => {
        return db.load(`select * from PHONG where idKhuVuc = ${idKhuVuc} order by idPhong DESC limit ${limit} offset ${offset}`);
    },

    countByArea: idKhuVuc => {
        return db.load(`select count(*) as total from PHONG where idKhuVuc = ${idKhuVuc}`);
    },

    single: id => {
        return db.load(`select * from PHONG where idPhong = ${id}`);
    },

    add: entity => {
        return db.add('PHONG', entity);
    },

    update: entity => {
        return db.update('PHONG', 'idPhong', entity);
    },

    delete: id => {
        return db.delete('PHONG', 'idPhong', id);
    },
};
