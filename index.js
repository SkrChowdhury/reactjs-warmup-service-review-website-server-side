const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

//middlewares

app.use(cors());
app.use(express.json());


////////////////////////

//fitbazzDBUser
//t5y3yQTfBRgBm8EY
//t5y3yQTfBRgBm8EY

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3rb4ny.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri)
