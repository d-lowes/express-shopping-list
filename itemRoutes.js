"use strict";

const express = require('express')

const db = require("./fakeDb");
const { NotFoundError, BadRequestError } = require("./expressError")
const router = new express.Router();

/** GET /items: return list list of shopping items: */
router.get("/", function (req, res, next) {

  return res.json(db.items);
});

/** POST /items: accept JSON body, add item, and return it: */
router.post("/", function (req, res, next) {
  //FIXME: should we just use insomnia for post or do it through web page?
  const itemToAdd = req.body;

  db.items.push(itemToAdd);

  return res.json({ added: itemToAdd });
});

/** GET /items/:name: return single item: {name: popsicle, "price": 1.45}*/
router.get("/:name", function (req, res, next) {

  const itemName = req.params.name;


  // TODO: make a helper function in separate file
  for (let item of db.items) {
    if (itemName === item.name) {
      return res.json({ item });
    }
  }

  throw new NotFoundError;
});

router.patch("/:name", function (req, res, next) {
  const itemName = req.params.name;
  const updateItem = req.body;
  console.log(updateItem);

  for (let item of db.items) {
    if (itemName === item.name) {
      item.name = updateItem.name;
      item.price = updateItem.price;

      return res.json({ updated: item });
    }
  }
});

router.delete("/:name", function (req, res, next) {

  
});





module.exports = router;