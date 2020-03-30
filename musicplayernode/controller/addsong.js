var addsong = require("express").Router();
var client = require("../config/config");

addsong.post("/", async (req, res) => {
    // console.log(req.body)
    client.query(
        `insert into songstb(aid,songs,songlink,album) values('${req.body.aid}','${req.body.songtitle}','${req.body.songPath}','${req.body.albumName}')`
      );
  res.send("done");
});

module.exports = addsong;
