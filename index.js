const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

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

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client.db('fitBazz').collection('services');
    const addCollection = client.db('fitBazz').collection('add');
    const orderCollection = client.db('fitBazz').collection('orders');

    //const reviewCollection=client.db('fitBazz').collection('reviews')

    app.get('/services', async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get('/services/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const service = await serviceCollection.findOne(query);
      res.send(service);
    });

    //add service api

    app.get('/addNewService', async (req, res) => {
      let query = {};

      //if(req.query.email){

      //query={

      //email:req.query.email

      //}

      //}

      const cursor = addCollection.find(query);
      const newadd = await cursor.toArray();
      res.send(newadd);
    });

    app.post('/addNewService', async (req, res) => {
      const result = await addCollection.insertOne(req.body);

      res.send(result);
    });

    //review api

    app.get('/orders', async (req, res) => {
      let query = {};

      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }

      const cursor = orderCollection.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });

    //review delete

    app.delete('/orders/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      res.send(result);
    });

    //review all start api

    // app.get('/reviews', async (req, res) => {
    //   let query = {};

    //   const cursor = reviewCollection.find(query);
    //   const orders = await cursor.toArray();
    //   res.send(orders);
    // });

    // app.delete('/reviews/:id', async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await reviewCollection.deleteOne(query);
    //   res.send(result);
    // })

    //review all end api

    app.post('/orders', async (req, res) => {
      const order = req.body;

      const review = await orderCollection.insertOne(order);
      res.send(review);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

// ////////////////////
app.get('/', (req, res) => {
  res.send('Fitbazz server running.');
});

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
});
