var addalbum = require("express").Router();
var client = require("../config/config");

addalbum.post("/", async (req, res) => {
    //  console.log(req.body)
    client.query(
        `insert into musicplayertb(album,albumimage) values('${req.body.albumName}','${req.body.albumImagePath}')`
      );
  res.send("done");
});

module.exports = addalbum;
