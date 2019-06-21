module.exports = {
    notLogin: (req, res, next) => {
        if (!req.user) {
            res.redirect('/account/login');
        } else next();
    },
    inLogin: (req, res, next) => {
        if (req.user) {
            res.redirect('/');
        } else next();
    },
    isAdmin: (req, res, next) => {
        if (!(req.user.role === 4)) {
            res.redirect('/pagenotfound');
        } else next();
    },
}