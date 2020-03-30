var route = require("express").Router();
route.use("/view", require("../controller/viewsong"));

module.exports = route;
