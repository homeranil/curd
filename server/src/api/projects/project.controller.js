const Project = require('./project.model');

const list = (RESPONSE = true, LIMIT = 500, ORDER = -1, ORDER_BY = 'updatedAt') => async (req, res, next) => {
    try {
        let filter = {};
        Object.assign(filter, req.lang);
        //Object.assign(filter, { title: 'First Projsect Edit 222'});
        const result = await Project.find(filter).populate('user', '_id username').limit(LIMIT).sort([[ORDER_BY, ORDER]]);
        if(RESPONSE){
            res.json(result);
        }
        else{
            res.projects = result;
            next();
        }
    }
    catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const result = await (await Project.findOne({ _id: req.params.id }));
        res.json(result);
    }
    catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    let unique = await Project.findOne({
        name: req.body.title
    });
    if(!unique) {
        try {
            const newProject = new Project({
                ...req.body,
                user: req.user._id
            });
            const createdEntry = await newProject.save();
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
    }
    else {
        const error = new Error('Not unique');
        res.status(422);
        next(error);
    }
};

const findProject = async (req, res, next) => {
    try {
        await Project.findOne({
            _id: req.params.id
        });
        next();
    }
    catch (err) {
        const error = new Error('Project not found');
        res.status(404);
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const del = await Project.findOneAndDelete({
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
    const updater = new Project(req.body);
    try {
        await updater.validate(async function(err) {
            if (err){
                res.status(422);
                res.json(err);
            }
            else{
                const filter = { _id: req.params.id };
                const update = req.body;
                const editEntry = await Project.findOneAndUpdate(filter, update, {
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
    findProject,
    remove,
    edit
};
