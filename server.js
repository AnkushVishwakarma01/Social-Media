const express = require('express');
const app = express();
const path = require('path');
const { default: mongoose } = require("mongoose");
const router = require('./Routes/index');
const bodyParser = require('body-parser');
var multer = require('multer');
const upload = multer();
require('dotenv').config();
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
//form-urlencoded

app.use(upload.array()); 

app.use(express.static(path.join(__dirname, 'Public')));
app.use('/',router);

app.set('view engine', 'ejs');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected!");
    app.listen(3500);
  }).catch(err => console.log(err));
}


