var viewsong = require("express").Router();
var client = require("../config/config");

viewsong.post("/", (req, res) => {
  client.query(`Select * from songstb where aid='${req.body.aid}';`, (err, response) => {
      console.log(response)
    res.send(response);
  });
});
module.exports = viewsong;
