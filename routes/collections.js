const { Collection, validate } = require('../models/collection');
const express = require('express');
const router = express.Router();

// All endpoints and route handlers go here
/////////////////////////////////////////////////////// POST //////////////////////////// 
router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) 
          return res.status(400).send(error);
          
    const collection = new Collection({
    term: req.body.term,
    definition: req.body.definition,
    item: req.body.item,
       
    });
      await collection.save();
      return res.send(collection);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`); }
    });
/////////////////////////////////////////////////////// GET all //////////////////////////// 
router.get('/', async (req, res) => {
  try {
    const collections = await Collection.find();
    return res.send(collections);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});
////////////////////////////////////////////////////////////// GET By Id //////////////////////// 
router.get('/:id', async (req, res) => {
  try {
      const collection = await Collection.findById(req.params.id);
          if (!collection)
              return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
    return res.send(collection);
} catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`);
}
}); 
////////////////////////////////////////////////////////////// PUT  //////////////////////// 
router.put('/:id', async (req, res) => {
  try {
const { error } = validate(req.body);
if (error) return res.status(400).send(error);
const collection = await Collection.findByIdAndUpdate(
  req.params.id,
  {
    term: req.body.term,
    definition: req.body.definition,
    item: req.body.item,  
      },
      { new: true }
    );
if (!collection)
return res.status(400).send(`The collection with id "${req.params.id}" d
oes not exist.`);
    await collection.save();
    return res.send(collection);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});  
////////////////////////////////////////////////////////////// DELETE //////////////////////// 
router.delete('/:id', async (req, res) => {
  try {
    const collection = await Collection.findByIdAndRemove(req.params.id);
      if (!collection)
      return res.status(400).send(`The collection with id "${req.params.id}" does not exist.`);
      return res.send(collection);
} catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`);
}
});
///////////////////////////////////////////////////////////////////////////////////////////////// 
module.exports = router;