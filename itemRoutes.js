"use strict";

const express = require('express')

const db = require("./fakeDb");

const router = new express.Router();

/** GET /items: return list list of shopping items: */
router.get("/", function (req, res) {
  return res.json(db.items);
});

/** POST /items: accept JSON body, add item, and return it: */
router.post("/", function (req, res) {
  const itemToAdd = {name: "popsicle", price: 1.45};

  db.items.push(itemToAdd);

  return res.json({added: itemToAdd});
});

module.exports = router;