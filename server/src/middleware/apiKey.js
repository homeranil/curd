const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { isAdmin } = require('../auth/auth.middlewares');

const schema = mongoose.Schema({
    apiKey: { type: String, required: true }
}, {
    timestamps: true
});

const Keys = mongoose.model('Key',schema);

router.get('/createToken', isAdmin, (req, res, next) => {
    if(req.body.apik) {
        const k = new Keys({
            apiKey: '21398ASD@!4312EASD@!$!CZCAScas90ua890cjaiofW$%RTq23498u3'
        });
        k.save();
        res.json(k);
    }
    else{
        const error = new Error('What?!');
        res.status(404);
        next(error);
    }
});

const enableApis = process.env.ENABLE_API_KEYS || 1;

router.use(async (req, res, next) => {
    const apiKey = req.get('X-API-KEY') || req.query.token;
    const has = apiKey ? await Keys.findOne({'apiKey': apiKey}) : '';
    if((apiKey && has) || enableApis == 0){
        next();
    }
    else {
        const error = new Error('Invalid API KEY');
        res.status(400);
        next(error);
    }
});

module.exports = router;
