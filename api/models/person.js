const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    Name: {type: String, required: true},
    ipPhone: {type: String, required: true},
    OfficePhone: {type: String, required: true},
    Canonicalname: {type: String, required: true},
    Title: {type: String, required: true},
    Depart: {type: String, required: true}, 
    Mdepart: {type: String, required: true},

},
    {collection: 'test'}
)
module.exports =model('Person', schema)