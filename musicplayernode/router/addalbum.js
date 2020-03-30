var route = require("express").Router();
route.use("/albumname", require("../controller/addalbum"));

module.exports = route;
