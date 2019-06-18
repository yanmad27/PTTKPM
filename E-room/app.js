var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


require('./middlewares/view-engine')(app);
require('./middlewares/session')(app);
require('./middlewares/passport')(app);

app.use(require('./middlewares/localArea.mdw'));
app.use(require('./middlewares/localRoom.mdw'));
app.use(require('./middlewares/auth-locals.mdw'));

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
    res.render('footer.hbs');
});


app.use('/areas', require('./routes/area.route'));
app.use('/account', require('./routes/account/account.route'));
app.use('/admin', require('./routes/admin/admin.route'));
app.use('/admin/areas', require('./routes/admin/area.route'));
app.use('/admin/rooms', require('./routes/admin/room.route'));
app.use('/admin/users', require('./routes/admin/user.route'));

app.use((req, res, next) => {
    res.render('404', { layout: false });
});

app.use((error, req, res, next) => {
    res.render('error', {
        layout: false,
        message: error.message,
        error
    })
});

var port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running at http://localhost:' +port+'/');
})