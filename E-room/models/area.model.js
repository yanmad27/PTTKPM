var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from KHUVUC');
    },
    
    allWithDetail: () => {
        return db.load(
        `select kv.idKhuVuc, kv.TenKhuVuc, count(r.idPhong) as num_of_rooms
        from KHUVUC kv left join PHONG r on kv.idKhuVuc = r.idKhuVuc
        group by kv.idKhuVuc, kv.TenKhuVuc`
        );
    },

    single: (id) =>{
        return db.load(`select * from KHUVUC where idKhuVuc = '${id}'`);
    },

    add: (entity) => {
        return db.add('KHUVUC',entity);
    },

    update: (entity) => {
        return db.update('KHUVUC','idKhuVuc',entity);
    },

    delete: (id) => {
        return db.delete('KHUVUC','idKhuVuc',id);
    }
}