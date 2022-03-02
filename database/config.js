const mongoose = require('mongoose');


const dbConnection = () => {

    try {
        mongoose.connect( process.env.MONGODB_CNN );

        console.log('Online database');
    } catch ( error ) {
        console.log( error );
        console.log('offline database');
    }
}


module.exports = {
    dbConnection
}