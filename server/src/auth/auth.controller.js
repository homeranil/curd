const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./auth.model');

const md5 = require('md5');

// Function that create token from jwt web token
function createToken (payload, expiresIn = process.env.TOKEN_EXPIRES || '1h'){
    return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: expiresIn});
}

// Create Token and send response with that token
const createTokenSendResponse = async (user, res, next) => {
    // payload
    const payload = {
        _id: user._id,
        hash: user.token
    };
    // create token
    const token = await createToken(payload);

    if(token) {
        // if have token send
        res.json({ token });
    }
    else {
        // else send 422 Un-Authorized error
        res.status(422);
        const error = Error('Unable to login');
        next(error);
    }
};

// send wrong login response
const wrongLoginResponse = (req, res, next) => {
    const error = Error('Unable to login');
    res.status(422);
    next(error);
};

/**
 * Login Function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = async (req, res, next) => {
    try {
    // find user by username
        const user = await User.findOne({'username': {'$regex': req.body.username,$options:'i'}});

        if (user) {
            const payload = {
                _id: user._id,
                h: Date.now()
            };
            user.token = await createToken(payload);
            await user.save();
            const result = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if(result) {
                createTokenSendResponse(user, res, next);
            }
            else {
                wrongLoginResponse(req, res, next);
            }
        }
        else{
            wrongLoginResponse(req, res, next);
        }
    }
    catch (error) {
        console.log(error);
    }
};

/**
 * Me Function
 * @param {*} req
 * @param {*} res
 */
const me = (req, res) => {
    res.json({
        user: req.user
    });
};

/**
 * Logout Function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const logout = (req, res, next) => {

};

/**
 * Signup Function
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const signup = async (req, res, next) => {
    try {
        const hashed = await bcrypt.hash(req.body.password, 12);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            emailHash: md5(req.body.email),
            password: hashed,
            role: 'user',
            active: true
        });
        const createdEntry = await newUser.save();
        createTokenSendResponse(createdEntry, res, next);
    }
    catch (error) {
        res.status(500);
        next(error);
    }
};

async function getOneByEmail(email){
    const user = await User.findOne({'email': {'$regex': email,$options:'i'}});
    return user ? true : false;
}

async function getOneByUsername(username){
    const user = await User.findOne({'username': {'$regex': username,$options:'i'}});
    return user ? true : false;
}
/**
 *
 */
module.exports = {
    login,
    me,
    signup,
    getOneByEmail,
    getOneByUsername
};
