const Model = require('./tags.model');

exports.list = (RESPONSE = true, LIMIT = 500, ORDER = -1, ORDER_BY = 'updatedAt') => async (req, res, next) => {
    try {
        let filter = {};
        //Object.assign(filter, req.lang);
        const result = await Model.find(filter).limit(LIMIT).sort([[ORDER_BY, ORDER]]);
        if(RESPONSE){
            res.json(result);
        }
        else{
            res.posts = result;
            next();
        }
    }
    catch (error) {
        next(error);
    }
};

exports.create = (uniquez = 'title') => async (req, res, next) => {
    let filter = {};
    filter[uniquez] = req.body[uniquez];
    console.log(filter);
    const unique = await Model.findOne(filter);

    if(!unique) {
        try {
            const newEntry = new Model({
                ...req.body
            });
            const createdEntry = await newEntry.save();
            res.status(200).json(createdEntry);
        }
        catch (error) {
            res.status(500);
            next(error);
        }
    }
    else {
        const error = new Error('Not unique');
        res.status(422);
        next(error);
    }
};

exports.getOneByTitle = async(title) => {
    const has = await Model.findOne({'title': {'$regex': title,$options:'i'}});
    return has ? true : false;
};
