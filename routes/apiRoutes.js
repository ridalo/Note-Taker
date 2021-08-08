const fs = require("fs");

const output = "./db/db.json";
const dataBase = require("../db/db.json")
let id = dataBase.length + 1;

module.exports = (app) => {
    //create the api route
    app.get("/api/notes", (req, res) => {
        res.json(dataBase);
    });

    //create a POST route for api
    app.post("/api/notes"), (req, res)=>{
        req.body.id = id++;
        dataBase.push(req.body);
        fs.writeFile(output, JSON.stringify(dataBase), (err)=>{
            if(err) throw err;
        });
        res.json(dataBase)
    };

    //delete individual notes
    app.delete("/api/notes/:id", (req, res)=>{
        let getId = req.params.id;
        for (let i = 0; i < dataBase.length; i++) {
            if (dataBase[i].id === parseInt(getId)){
                dataBase.splice(i, 1)
            }
            fs.writeFile(output, JSON.stringify(dataBase), (err)=>{
                if(err) throw err;
            });
            res.json(dataBase)
        }
    });
};