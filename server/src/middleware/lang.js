// set lang
module.exports = (req, res, next) => {
    let langs = process.env.LANGS || 'en';
    langs = langs.split(',');
    let { lang } = req.query;
    if(!langs.includes(lang))
        lang = process.env.DEFAULT_LANG || 'en';
    req.lang = { lang };
    next();
};
