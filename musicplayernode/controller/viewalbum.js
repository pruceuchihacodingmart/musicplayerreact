var lists = require("express").Router();
var client = require("../config/config");

lists.post("/", (req, res) => {
  client.query(`Select * from musicplayertb;`, (err, response) => {
      console.log(response,"ddf")
    res.send(response);
  });
});
module.exports = lists;
