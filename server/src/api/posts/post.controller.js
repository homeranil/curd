const Post = require('./post.model');

const list = (RESPONSE = true, LIMIT = 500, ORDER = -1, ORDER_BY = 'updatedAt') => async (req, res, next) => {
    try {
        let filter = {};
        // Object.assign(filter, req.lang);
        const result = await Post.find(filter)
            .populate('user', '_id username')
            .populate({
                path: 'tags',
                match: { status: { $gte: true } },
                select: '_id title'
            })
            .limit(LIMIT)
            .sort([[ORDER_BY, ORDER]]);
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

const get = async (req, res) => {
    res.json(res.post);
};

const create = async (req, res, next) => {
    try {
        const newPost = new Post({
            ...req.body,
            user: req.user._id
        });
        const createdEntry = await newPost.save();
        req.io.emit('newPost', createdEntry);
        res.status(200).json(createdEntry);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422);
            res.json(error);
        }
        else {
            res.status(500);
            next(error);
        }
    }

};

const findPost = async (req, res, next) => {
    try {
        res.post = await Post.findOne({
            _id: req.params.id
        })
            .populate('user', '_id username')
            .populate({
                path: 'tags',
                match: { status: { $gte: true } },
                select: '_id title'
            });
        next();
    }
    catch (err) {
        const error = new Error('Post not found');
        res.status(404);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const del = await Post.findOneAndDelete({
            _id: req.params.id
        });
        res.status(200).json(del);
    }
    catch (error) {
        res.status(500);
        next(error);
    }
};

const edit = async (req, res, next) => {
    const updater = new Post(req.body);
    try {
        await updater.validate(async function(err) {
            if (err){
                res.status(422);
                res.json(err);
            }
            else{
                req.body.tags = req.body.tags.map((v) => v._id);
                const filter = { _id: req.params.id };
                const update = req.body;
                const editEntry = await Post.findOneAndUpdate(filter, update, {
                    new: true,
                    upsert: true,
                    rawResult: true // Return the raw result from the MongoDB driver
                });
                res.status(200).json(editEntry);
            }
        });
    }
    catch (error) {
        res.status(500);
        next(error);
    }
};

module.exports = {
    list,
    get,
    create,
    findPost,
    remove,
    edit
};
