const ToDo = require('../models/toDo');

exports.getToDos = async function (req, res, next) {
    const {userName} = req.query
    console.log( 'some',userName)
    try {
        const product = await ToDo.find({userName: userName})
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.createToDo = async function (req, res, next) {
    const {text, userName} = req.body;
    try {
        const product = new ToDo(
            {
                text,
                userName,
            }
        );
        await product.save()
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.updateToDo = async function (req, res, next) {
    const {isChecked} = req.body;
    try {
        const product = await ToDo.findByIdAndUpdate(req.params.id, {isChecked}, {new: true})
        return res.json(product)
    } catch (e) {
        return next(e)
    }
}

exports.UpdateAllToDo = async function (req, res, next) {
    const {isChecked} = req.body;
    try {
        await ToDo.updateMany({}, {isChecked}, {new: true})
        return res.status(200).json('nice')
    } catch (e) {
        return next(e)
    }
}

exports.deleteToDo = async function (req, res, next) {
    try {
        ToDo.findByIdAndRemove(req.params.id)
        return res.send('Deleted successfully!');
    } catch (e) {
        return next(e);
    }

}

exports.DeleteAllChecked = async function (req, res, next) {
    try {
        await ToDo.deleteMany({isChecked: true})
        return res.send('Deleted successfully!')
    } catch (e) {
        return next(e);
    }
}




