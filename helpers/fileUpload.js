const paht = require('path');
const { v4: uuidv4 } = require('uuid');
const { User, Product } = require('../models');

const fileUpload = ( files, allowedExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ], folder = '' ) => {
    return new Promise( (resolve, rejects) =>{
        // "file" is used to retrieve the uploaded file
        const { file } = files;


        const fileNameSplit = file.name.split('.');
        const fileExtension = fileNameSplit[ fileNameSplit.length-1 ];

        if ( !allowedExtensions.includes( fileExtension ) ) {
            return rejects(`The file extension '${ fileExtension }' is not allowed. The allowed extensions are: ${ allowedExtensions }`)
        }

        const fileRename = uuidv4() +'.'+ fileExtension;

        // Created upload path
        uploadPath = paht.join( __dirname, '../uploads/', folder, fileRename );

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err)=> {
        if (err){
            console.log(err);
            return rejects(err);
        }
        resolve( fileRename );
        });

    });

}

const CheckModelToUpload = ( params ) => {

    return new Promise( async( resolve, rejects ) => {
        
        const { id, collection } = params;

        let model;
    
        switch ( collection ) {
            case 'users':
                model = await User.findById( id );
                if ( !model ) {
                    return rejects( `The ID: '${id}' is not valid, Try another ID.` );
                }
                break;
            case 'products':
                model = await Product.findById( id );
                if ( !model ) {
                    return rejects( `The ID: '${id}' is not valid, Try another ID.` );
                }
                break;
        
            default:
                return rejects( 'Sorry!, I forgot to validate that.' );
                break;
        }

        resolve({ collection, model });
    });

}

module.exports = {
    fileUpload,
    CheckModelToUpload
}
