const mongoose = require('mongoose'); 
const Joi  = require('joi');

const collectionSchema = new mongoose.Schema({
    term: { type: String, required: true, minlength: 2, maxlength: 255 }, 
    definition: { type: String, required: true },
    item: { type: Number, required: true,}, 
    dateModified: { type: Date, default: Date.now },
}); 
 
const Collection  = mongoose.model('Collection', collectionSchema);  

function validateCollection(collection){
    const schema  = Joi.object({
        term: Joi.string().min(2).max(50).required(),
        definition: Joi.string().required(),
        item: Joi.number().required(),
    });
    return schema.validate(collection);
}
 
exports.Collection = Collection; 
exports.validate  = validateCollection;
exports.collectionSchema = collectionSchema;