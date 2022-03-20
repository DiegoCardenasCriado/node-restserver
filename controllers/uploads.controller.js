const path = require('path');
const fs = require('fs');

const { fileUpload, CheckModelToUpload } = require("../helpers");
const { User, Product } = require('../models');

const uploadGetById = async( req, res ) => {

    try {
        
        let { collection, model } = await CheckModelToUpload( req.params );

        if ( model.img ) {
            const imgPath = path.join( __dirname, '../uploads', collection, model.img );
            if ( fs.existsSync( imgPath ) ) {
                return res.sendFile( imgPath );
            }
        }

        const imgPath = path.join( __dirname, '../assets/no-image.jpg');
        res.sendFile(imgPath);

    } catch ( msg ) {
        return res.status(400).json({ msg });
    }

}


const uploadPost = async( req, res ) => {

    try {

        // const fileName = await fileUpload( req.files, ['txt, md'], 'textos' );
        const fileName = await fileUpload( req.files, undefined, 'img' );

        res.json({
            msg: `File uploaded!`,
            fileName
        });
        
    } catch ( msg ) {
        return res.status(400).json({ msg });
    }
}
const uploadPut = async( req, res ) => {

    try {
        
        let { collection, model } = await CheckModelToUpload( req.params );

        if ( model.img ) {
            const imgPath = path.join( __dirname, '../uploads', collection, model.img );
            if ( fs.existsSync( imgPath ) ) {
                fs.unlinkSync( imgPath );
            }
        }

        const fileName = await fileUpload( req.files, undefined, collection );
        model.img = fileName;
        await model.save();
    
        res.json({
            msg: `File uploaded!`,
            fileName
        });

    } catch ( msg ) {
        return res.status(400).json({ msg });
    }

}

module.exports = {
    uploadPost,
    uploadPut,
    uploadGetById
}