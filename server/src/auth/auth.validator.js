const { check, validationResult } = require('express-validator');
const { getOneByEmail, getOneByUsername } = require('./auth.controller');

const validateSignUpUser = async  (req, res, next) => {
    // check email
    await check('email')
        .isEmail().withMessage('Must be a email')
        .custom(async (value) => {
            return await getOneByEmail(value).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use');
                }
            });
        })
        .run(req);

    // check password
    await   check('password')
        .isLength({ min: 6 }).withMessage('Must be at least 6 chars long')
        .matches(/(?=.*[0-9])/).withMessage('Require that at least one digit appear anywhere in the string')
        .matches(/(?=.*[a-z])/).withMessage('Require that at least one lowercase letter appear anywhere in the string')
        .matches(/(?=.*[A-Z])/).withMessage('Require that at least one uppercase letter appear anywhere in the string')
        .matches(/(?=.*[!@#$%^&*])/).withMessage('Require that at least one special character appear anywhere in the string')
        .run(req);

    //check username
    await check('username')
        .matches(/^[a-zA-Zא-ת0-9]+([_.-]?[a-zA-Z0-9א-ת])*$/)
        .custom(async (value) => {
            return await getOneByUsername(value).then(user => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
            });
        })
        .run(req);

    // check avatar
    await check('avatar').optional().isURL({ protocols: ['http','https']}).withMessage('Invalid  url').run(req);

    // check result
    const result = validationResult(req);
    if (!result.isEmpty()) {
        // if empty return error
        return res.status(422).json({ errors: result.array() });
    }

    //else continue
    return next();

};

module.exports = {
    validateSignUpUser
};
