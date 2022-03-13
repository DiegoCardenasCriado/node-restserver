const bcryptjs = require('bcryptjs');
const { Category } = require('../models');

const categoryGet = async(req, res) => {

    const { limit=5, skip } = req.query
    const query = { state:true };

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
        .populate('user', 'name')
        .skip( Number( skip ) )
        .limit( Number( limit ) )
    ])

    res.json({
        msg: 'GET ALL API - CONTROLLER',
        total,
        categories
    });
}

const categoryGetById = async(req, res) => {

    const { id } = req.params;
    const category = await Category.findById( id ).populate('user', 'name');

    if ( !category.state ) {
        return res.status(400).json({
            msg: 'The category does not exist in the database'
        })
    }

    res.json({
        msg: 'GET BY ID API - CONTROLLER',
        category
    });
}

const categoryPost = async(req, res) => {

    const name = req.body.name.toUpperCase();
    // Search category in DB
    const categoryDB = await Category.findOne({name});

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `The '${categoryDB.name}' category already exists in the database.`
        });
    }
    
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category( data );
    // Save category in DB
    await category.save();

    res.status(201).json({
        msg: 'POST API - - CONTROLLER',
        category
    });
}

const categoryPut = async(req, res) => {

    const { id } = req.params;
    const { _id, user, state, ...category } = req.body;

    category.name = category.name.toUpperCase();
    category.user = req.user._id;

    const categoryUpdate = await Category.findByIdAndUpdate( id, category, { new: true } );

    res.json({
        msg: 'PUT API - - CONTROLLER',
        categoryUpdate
    });
}

const categoryPatch = (req, res) => {

    res.json({
        msg: 'PATCH API - - CONTROLLER'
    })
}

const categoryDelete = async(req, res) => {

    const { id } = req.params;
    const categoryDelete = await Category.findByIdAndUpdate( id, { state: false }, { new: true } )
    res.json({
        msg: 'DELETE API - CONTROLLER',
        categoryDelete
    });
}

module.exports = {
    categoryGet,
    categoryGetById,
    categoryPost,
    categoryPut,
    categoryPatch,
    categoryDelete
}