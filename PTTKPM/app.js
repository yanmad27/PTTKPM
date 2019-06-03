var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');

var app = express();
app.use(express.static('public'));
app.use(express.static('images'));

app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: 'views/layouts'
}));
app.set('view engine', 'hbs');

app.use(require('./middlewares/localArea.mdw'));
app.use(require('./middlewares/localRoom.mdw'));

app.get('/partials/', (req, res) => {
    res.render('header.hbs');
});

app.get('/partials/', (req, res) => {
    res.render('slider.hbs');
})

app.get('/', (req, res) => {
    res.render('home.hbs');
});

app.get('/partials/', (req, res) => {
    res.render('foote r.hbs');
});


app.use('/areas', require('./routes/area.route'));

app.listen(8000, () => {
    console.log('server running at http://localhost:8000');
})