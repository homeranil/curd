const { check, validationResult } = require('express-validator');
const { getOneByTitle } = require('./tags.controller');


exports.validateAddTag = async  (req, res, next) => {
    await check('title')
        .matches(/^[a-zA-Zא-ת0-9]+([_. -]?[a-zA-Z0-9א-ת])*$/)
        .custom(async (value) => {
            return await getOneByTitle(value).then(user => {
                if (user) {
                    return Promise.reject('Tag already in use');
                }
            });
        })
        .run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
        // if empty return error
        return res.status(422).json({ errors: result.array() });
    }

    //else continue
    return next();
};
