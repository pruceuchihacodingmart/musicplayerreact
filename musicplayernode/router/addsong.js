var route = require("express").Router();
route.use("/songname", require("../controller/addsong"));

module.exports = route;
