// This example sets up an endpoint using the Express framework.
// Watch this video to get started: http://youtu.be/rPR2aJ6XnAc.

const express = require('express');
const app = express();
require("dotenv").config()

const stripe = require('stripe')((process.env.STRIPE_PRIVATE_KEY));
//middleware for cross server communication
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors())

//json hantera
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/get', async (req, res) => {
  console.log("it works");
});

app.post('/create-checkout-session', async (req, res) => {

  console.log("request body", req.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'sek',
          product_data: {
            name: req.body.product,
          },
          unit_amount: req.body.price*100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://pik-span-strapi.herokuapp.com/services',
    cancel_url: 'https://bookingappstripe2021.herokuapp.com/cancel',

    });

  res.json({ id: session.id });
});

app.listen(process.env.PORT || 4242 , () => console.log(`Listening on port ${4242}!`));