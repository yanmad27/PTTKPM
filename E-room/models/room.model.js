var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from PHONG order by idPhong DESC');
    },

    partOfRooms: () => {
        return db.load('select * from PHONG limit 3');
    },

    partOfRoomsById: (idKhuVuc) => {
        return db.load(`select * from PHONG where idKhuVuc = ${idKhuVuc} limit 3`);
    },

    pageAll: (limit, offset) => {
        return db.load(`select * from PHONG order by idPhong DESC limit ${limit} offset ${offset}`);
    },

    countAll: () => {
        return db.load(`select count(*) as total from PHONG`);
    },

    allByArea: idKhuVuc => {
        return db.load(`select * from PHONG where idKhuVuc = ${idKhuVuc} order by idPhong DESC`);
    },

    pageByArea: (idKhuVuc, limit, offset) => {
        return db.load(`select * from PHONG where idKhuVuc = ${idKhuVuc} order by idPhong DESC limit ${limit} offset ${offset}`);
    },
    
    countByArea: idKhuVuc => {
        return db.load(`select count(*) as total from PHONG where idKhuVuc = ${idKhuVuc}`);
    },
    
    search: (entity, limit, offset) => {
        return db.load(`SELECT * FROM PHONG WHERE MATCH(TenPhong, DiaChi)
        AGAINST('${entity}' IN NATURAL LANGUAGE MODE) order by idPhong DESC limit ${limit} offset ${offset}
        `)
    },

    countSearch: (entity) => {
        return db.load(`SELECT count(*) FROM PHONG WHERE MATCH(TenPhong, DiaChi)
        AGAINST('${entity}' IN NATURAL LANGUAGE MODE)
        `)
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
    }
};
