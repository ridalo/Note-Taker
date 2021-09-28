const fs = require("fs");
const out_put = "./db/db.json";

const database = require("../db/db.json");
let id = database.length + 1;

module.exports = function (app) {
  // Create the API Route
  app.get("/api/notes", (req, res) => {
    res.json(database);
  });

  // create a post for the API
  app.post("/api/notes", (req, res) => {
    req.body.id = id++;
    database.push(req.body);
    fs.writeFile(out_put, JSON.stringify(database), (err) => {
      if (err) throw err;
    });
    res.json(database);
  });

  // delete individual notes
  app.delete("/api/notes/:id", (req, res) => {
    let getId = req.params.id;

    for (let i = 0; i < database.length; i++) {
      if (database[i].id === parseInt(getId)) {
        database.splice(i, 1);
      }
    }
    fs.writeFile(out_put, JSON.stringify(database), function (err) {
      if (err) throw err;
    });
    res.json(database);
  });
};