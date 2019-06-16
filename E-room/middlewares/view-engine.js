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
            ifEq: (arg1, arg2, options) => {
                return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
            },
            section: hbs_sections()
        }
    }));
    app.set('view engine', 'hbs');
}