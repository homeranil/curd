const jwt = require('jsonwebtoken');
const User = require('./auth.model');

function unAuthorized(res, next) {
    const error = new Error('🚫 Un-Authorized 🚫');
    res.status(401);
    next(error);
}

function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    }
    else {
        unAuthorized(res, next);
    }
}

function isGuest(req, res, next) {
    if (req.user) {
        unAuthorized(res, next);
    }
    else {
        next();
    }
}

function isAdmin(req, res, next) {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        unAuthorized(res, next);
    }
}

function checkTokenSetUser(req, res, next) {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (token) {
            // use jwt lib to decode
            jwt.verify(token, process.env.TOKEN_SECRET, async (error, user) => {
                let me = '';
                if (error) {
                    // TODO something ??? maybe send error?! ban form 1 min?!
                    console.log(error);
                }
                else{
                    me = await User.findOne({
                        '_id': user._id,
                        'token': user.hash
                    }, '-password -token -createdAt -active');
                }
                req.user = me;
                next();
            });
        }
        else {
            next();
        }
    }
    else {
        next();
    }
}

module.exports = {
    checkTokenSetUser,
    isLoggedIn,
    isAdmin,
    isGuest
};
