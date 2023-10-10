const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    user: {type: Types.ObjectId, ref: 'User'},
    token: {type: String, required: true, unique: true}
})

module.exports = model('Token', schema)