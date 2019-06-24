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
        if (!(req.user.role_id === 1)) {
            res.redirect('/pagenotfound');
        } else next();
    },
    isLessor: (req, res, next) => {
        if (!(req.user.role_id === 4)) {
            res.redirect('/pagenotfound');
        } else next();
    },
}