// Do not expose your credentials in the code for Production Environment.
let atlasDB = "mongodb+srv://appuser:QUUsy6OT4QAxKPuG@cluster004m2022.pzs5iou.mongodb.net/test";

// Database setup
let mongoose = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);
    let mongoDb = mongoose.connection;

    mongoDb.on('error', console.error.bind(console, 'Connection Error:'));
    mongoDb.once('open', ()=>{
        console.log('Connected to MongoDB...');
    });

    return mongoDb;
}