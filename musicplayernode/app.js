const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
var client = require("./config/config");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(8080, () => {
  console.log('8080');
});

// for inserting album
app.use("/addalbum", require("./router/addalbum"));

//for displaying albums
app.use("/view", require("./router/viewalbum"));

//for inserting songs
app.use("/addsong",require("./router/addsong"));

//for viewing songs
app.use("/songs",require("./router/viewsong"));