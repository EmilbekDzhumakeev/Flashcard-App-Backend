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
///////////////////////////////////////////////////////////////////////////////////////////////// 
module.exports = router;