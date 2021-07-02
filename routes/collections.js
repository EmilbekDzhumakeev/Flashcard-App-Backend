const { Card, validateCard} = require('../models/card'); 
const { Collection, validateCollection } = require('../models/collection')

const express = require('express');
const router = express.Router();

/////////////////////////////////////////////////////// POST ////////////////////////////

router.post('/:collectionId/studySet/', async (req, res) => { 
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection) return res.status(400).send(`The collection with id "${req.params.collectionId}" does not exist.`);

    //const card = await Card.findById(req.params.cardId);
    //if (!card) return res.status(400).send(`The card with id "${req.params.cardId}" does not exist.`);

    const card = new Card({
      term: req.body.term,
      definition: req.body.definition,
      item: req.body.item,
         
      });

    collection.studySet.push(card);

    await collection.save();
    return res.send(collection.studySet);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});
module.exports = router;

// All endpoints and route handlers go here
/////////////////////////////////////////////////////// POST ////////////////////////////
router.post('/', async (req, res) => {
    try {
        const { error } = validateCollection(req.body);
        if (error) 
          return res.status(400).send(error);
          
    const collection = new Collection({
    name: req.body.name,
    });
    // const card = new Card({
    //   term: req.body.term,
    //   definition: req.body.definition,
    //   item: req.body.item,
         
    //   });
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
      const card = await Collection.findById(req.params.id);
          if (!card)
              return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
    return res.send(card);
} catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`);
}
}); 
/*
////////////////////////////////////////////////////////////// PUT  //////////////////////// 
router.put('/:id', async (req, res) => {
  try {
const { error } = validate(req.body);
if (error) return res.status(400).send(error);
const card = await Collection.findByIdAndUpdate(
  req.params.id,
  {
    term: req.body.term,
    definition: req.body.definition,
    item: req.body.item,  
      },
      { new: true }
    );
if (!card)
return res.status(400).send(`The card with id "${req.params.id}" d
oes not exist.`);
    await card.save();
    return res.send(card);
  } catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`); }
});  
////////////////////////////////////////////////////////////// DELETE //////////////////////// 
router.delete('/:id', async (req, res) => {
  try {
    const card = await Collection.findByIdAndRemove(req.params.id);
      if (!card)
      return res.status(400).send(`The card with id "${req.params.id}" does not exist.`);
      return res.send(card);
} catch (ex) {
return res.status(500).send(`Internal Server Error: ${ex}`);
}
});
///////////////////////////////////////////////////////////////////////////////////////////////// 
*/

module.exports = router;