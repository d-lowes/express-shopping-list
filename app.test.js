"use strict";

const request = require("supertest");

const app = require("./app");
let db = require("./fakeDb");

let items = {
  name: "GoTS8",
  price: "0.69"
};

/** GET /items - returns `[{
  name: "GoTS8",
  price: "0.69"}, ...]
` */

beforeEach(function() {
  db.items.push(items);
});

afterEach(function() {
  db.items.pop();
});

describe("GET /not-here", function() {
  it("Responds with 404 if endpoint invalid", async function() {
    const resp = await request(app).get(`/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

describe("GET /items", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items`);

    expect(resp.body).toEqual(db.items);
  });
});


describe("POST /items", function() {
  it("Returns item added", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send(items);
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
          "added": {
            "name": "GoTS8",
            "price": "0.69"
          }
        });
  });
});

describe("GET /items/:name", function() {
  it("Gets a list of items", async function() {
    const resp = await request(app).get(`/items/${items.name}`);

    expect(resp.body).toEqual({
      "item": {
        "name": "GoTS8",
        "price": "0.69"
      }
    });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).get(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

describe("PATCH /items/:name", function() {
  it("Update item", async function() {
    const resp = await request(app)
      .patch(`/items/${items.name}`)
      .send({
        name: "GoTS7"
      });;
      expect(resp.statusCode).toEqual(200);
      expect(resp.body).toEqual({
          "updated": {
            "name": "GoTS7"
          }
        });
  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).patch(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});

/** DELETE /items/[name] - delete item,
 *  return `{message: "deleted"}` */

describe("DELETE /items/:name", function() {
  it("Deletes a single item", async function() {
    console.log("items.name=", items.name)
    const resp = await request(app)
      .delete(`/items/${items.name}`);
      expect(resp.body).toEqual({
        "message": "deleted"
      });

  });

  it("Responds with 404 if name invalid", async function() {
    const resp = await request(app).delete(`/items/not-here`);
    expect(resp.statusCode).toEqual(404);
  });
});