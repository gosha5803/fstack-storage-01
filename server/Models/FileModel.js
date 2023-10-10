const {model, Schema, Types} = require('mongoose')

const schema = new Schema({
    user:{type: Types.ObjectId, ref: 'User'},
    parent: {type: String, default: process.env.LOCAL_STORAGE_PATH},
    name: {type: String, required: true, default:'Новая папка'}
})

module.exports = model('File', schema)