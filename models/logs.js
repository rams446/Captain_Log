// Data

    const {Schema, model} = require('mongoose');

    const logSchema = new Schema({
        title:  { type: String, required: true },
        Entry:  { type: String, required: true },
        shipIsBroken:  { type: String, required: true },
    
    });

    const Log = model('Log', logSchema);

    module.exports = Log;