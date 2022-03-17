const { ObjectId } = require('mongoose').Types
const { User, Category, Product } = require('../models')


const Allowedcollections = [
    'categories',
    'products',
    'roles',
    'users'
];

const categorySearch = async( search = '', res ) => {

    const isMongoId = ObjectId.isValid(search);

    if ( isMongoId ) {
        const category = await Category.findById(search)
                            .populate('user','name');
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp( search, 'i' );
    // const categories = await Category.find({
    //     $or: [{ name: regex }, { email: regex }],
    //     $and: [{ state: true }]
    // });
    const categories = await Category.find({ name: regex, state: true })
                            .populate('user','name');
    return res.json({
        results: categories
    });
    
}

const productSearch = async( search = '', res ) => {

    const isMongoId = ObjectId.isValid(search);

    if ( isMongoId ) {
        const product = await Product.findById(search)
                            .populate('category','name').populate('user','name');
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp( search, 'i' );
    const products = await Product.find({
        $or: [{ name: regex }, { description: regex }],
        $and: [{ state: true }]
    }).populate('category','name').populate('user','name');
    return res.json({
        results: products
    });
    
}

const userSearch = async( search = '', res ) => {

    const isMongoId = ObjectId.isValid(search);

    if ( isMongoId ) {
        const user = await User.findById(search);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp( search, 'i' );
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });
    return res.json({
        results: users
    });
    
}

const search = ( req, res ) => {

    const { collection, search } = req.params;

    if ( !Allowedcollections.includes( collection ) ) {
        return res.status(400).json({
            msg: `The collection: '${collection}' is not in the database.`
        })
    }

    switch ( collection ) {
        case 'categories':
            categorySearch( search, res );
            break;
        case 'products':
            productSearch( search, res );
            break;
        case 'users':
            userSearch( search, res );
            break;
        default:

            break;
    }
}

module.exports = {
    search,
    categorySearch,
    productSearch,
    userSearch
}