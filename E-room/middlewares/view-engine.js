var exphbs = require('express-handlebars');
var numeral = require('numeral');
var hbs_sections = require('express-handlebars-sections');

module.exports = function (app) {
    app.engine('hbs', exphbs({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: 'views/layouts',
        helpers: {
            format: val => {
                return numeral(val).format('0,0');
            },
            formatDistrict: (areaName) => {
                var rs = ``
                String(areaName).split(' ').forEach(value=>{
                    rs+= ` `+value[0].toUpperCase() + value.slice(1);
                })
                return `Quận`+rs;
            },
            formatStatus: status => {
                var rs = '';
                switch (status) {
                    case 0:
                        rs = '<i class="fa fa-clock-o" style="color:gray"></i>';
                        break;
                    case 1:
                        rs = '<i class="fa fa-check " style="color:green"></i>';
                }
                return rs;
            },
            ifEq: (arg1, arg2, options) => {
                return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
            },
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
}