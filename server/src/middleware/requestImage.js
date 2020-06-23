module.exports = (req, res, next) => {
    const envAllowOrigins = process.env.ALLOW_ORIGINS || 'http://localhost:3000';
    const allowOrigin = envAllowOrigins.split(' ');
    const referer = req.headers.referer;

    const result = allowOrigin.filter(o => referer.startsWith(o + '/'));
    if(result.length > 0){
        next();
    }
    else{
        res.redirect(301, 'https://www.expression-web-tutorials.com/images/forbidden.jpg');
    }
};
