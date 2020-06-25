const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const schema = mongoose.Schema({
  apiKey: { type: String, required: true },
}, {
  timestamps: true
});

const Keys = mongoose.model('Key',schema);

router.use('/createToken', (req, res) => {
  const k = new Keys({
    apiKey: '21398ASD@!4312EASD@!$!CZCAScas90ua890cjaiofW$%RTq23498u3'
  })
  k.save();
  res.json(k);
});

router.use(async (req, res, next) => {
  const apiKey = req.get('X-API-KEY') || req.query.token;
  const has = apiKey ? await Keys.findOne({'apiKey': apiKey}) : '';
  if(apiKey && has){
    next();
  } else {
    const error = new Error('Invalid API KEY');
    res.status(400);
    next(error);
  }
})

module.exports = router;
