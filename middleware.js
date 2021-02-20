module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'you must login')
        return res.redirect('/login')
    }
    next();
}

module.exports