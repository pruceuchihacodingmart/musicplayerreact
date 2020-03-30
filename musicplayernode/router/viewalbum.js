var route = require("express").Router();
route.use("/album", require("../controller/viewalbum"));

module.exports = route;
