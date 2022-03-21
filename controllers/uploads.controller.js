const path = require('path');
const fs = require('fs');
var cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL );

const { fileUpload, CheckModelToUpload } = require("../helpers");
const { User, Product } = require('../models');

// Get by id image
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
// const uploadPut = async( req, res ) => {

//     try {
        
//         let { collection, model } = await CheckModelToUpload( req.params );

//         if ( model.img ) {
//             const imgPath = path.join( __dirname, '../uploads', collection, model.img );
//             if ( fs.existsSync( imgPath ) ) {
//                 fs.unlinkSync( imgPath );
//             }
//         }

//         const fileName = await fileUpload( req.files, undefined, collection );
//         model.img = fileName;
//         await model.save();
    
//         res.json({
//             msg: `File uploaded!`,
//             fileName
//         });

//     } catch ( msg ) {
//         return res.status(400).json({ msg });
//     }

// }

// Upload or update image with Cloudinary
const uploadPutCloudinary = async( req, res ) => {

    try {
        
        // Verify Model
        let { model } = await CheckModelToUpload( req.params );

        // Validate the existence of the model image.
        if ( model.img ) {
            const arrayName = model.img.split('/');
            const name = arrayName[ arrayName.length - 1 ];
            const [ public_id ] = name.split('.'); 
            // Destroy image old
            cloudinary.uploader.destroy( public_id )
        }
        // Get the image URL of Cloudinary.
        const { tempFilePath } = req.files.file;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        
        // Save URL in the model.
        model.img = secure_url;
        await model.save();
    
        res.json({
            msg: `File uploaded!`,
            model
        });

    } catch ( msg ) {
        return res.status(400).json({ msg });
    }

}

module.exports = {
    uploadGetById,
    uploadPost,
    uploadPutCloudinary,
}