const bcryptjs = require('bcryptjs');
const { Product } = require('../models');

const productGet = async(req, res) => {

    const { limit=5, skip } = req.query
    const query = { state:true };

    const [ total, products ] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip( Number( skip ) )
        .limit( Number( limit ) )
    ]);

    res.json({
        msg: 'GET ALL API - CONTROLLER',
        total,
        products
    });
}

const productGetById = async(req, res) => {

    const { id } = req.params;
    const product = await Product.findById( id )
                        .populate('user', 'name')
                        .populate('category', 'name');
    if ( !product.state ) {
        return res.status(400).json({
            msg: 'The product does not exist in the database'
        })
    }

    res.json({
        msg: 'GET BY ID API - CONTROLLER',
        product
    });
}

const productPost = async(req, res) => {

    const { state, user, ...body } = req.body;
    body.name = body.name.toUpperCase();
    
    // Search product in DB
    const productDB = await Product.findOne({ name: body.name });

    if ( productDB ) {
        return res.status(400).json({
            msg: `The product: '${productDB.name}' already exists in the database.`
        });
    }
    
    const data = {
        ...body,
        user: req.user._id,
    }

    const product = new Product( data );
    // Save product in DB
    await product.save();

    res.status(201).json({
        msg: 'POST API - - CONTROLLER',
        product
    });
}

const productPut = async(req, res) => {

    const { id } = req.params;
    const { _id, user, state, ...body } = req.body;

    if ( body.name ) {
        body.name = body.name.toUpperCase();
    }
    body.user = req.user._id;

    const productUpdate = await Product.findByIdAndUpdate( id, body, { new: true } );

    res.json({
        msg: 'PUT API - - CONTROLLER',
        productUpdate
    });
}

const productPatch = (req, res) => {

    res.json({
        msg: 'PATCH API - - CONTROLLER'
    })
}

const productDelete = async(req, res) => {

    const { id } = req.params;
    const productDelete = await Product.findByIdAndUpdate( id, { state: false }, { new: true } )
    res.json({
        msg: 'DELETE API - CONTROLLER',
        productDelete
    });
}

module.exports = {
    productGet,
    productGetById,
    productPost,
    productPut,
    productPatch,
    productDelete
}