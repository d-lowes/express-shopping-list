"use strict";

const express = require('express')

const db = require("./fakeDb");
const { NotFoundError } = require("./expressError")
const router = new express.Router();

/** GET /items: return list list of shopping items: */
router.get("/", function (req, res, next) {
  return res.json(db.items);
});

/** POST /items: accept JSON body, add item, and return it: */
router.post("/", function (req, res, next) {
  const itemToAdd = req.body;

  db.items.push(itemToAdd);

  return res.json({ added: itemToAdd });
});

/** GET /items/:name: return single item: {name: popsicle, "price": 1.45}*/
router.get("/:name", function (req, res, next) {
  const itemName = req.params.name;

  for (let item of db.items) {
    if (itemName === item.name) {
      return res.json({ item });
    }
  }

  throw new NotFoundError;
});

/** PATCH /items/:name: accept JSON body, modify item, return it: */
router.patch("/:name", function (req, res, next) {
  const itemName = req.params.name;
  const updateItem = req.body;

  for (let item of db.items) {
    if (itemName === item.name) {
      item.name = updateItem.name;
      item.price = updateItem.price;

      return res.json({ updated: item });
    }
  }
    throw new NotFoundError;
});

/** DELETE /items/:name: delete item: */
router.delete("/:name", function (req, res, next) {
  const itemName = req.params.name;

  for (let i = 0; i < db.items.length; i++) {
    if (itemName === db.items[i].name) {
      db.items.splice(i, 1);

      return res.json({ message: "deleted" });
    }
  }

  throw new NotFoundError;
});


module.exports = router;