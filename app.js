const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  config = require("config"),
  app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http, {
  path: '/blockpesa/io',
});

const PORT = process.env.PORT || 8001;
const db = config.get("db.name");

mongoose.connect(`mongodb://rayauxey:!1Gaishah@mflix-shard-00-00-mk7jy.mongodb.net:27017,mflix-shard-00-01-mk7jy.mongodb.net:27017,mflix-shard-00-02-mk7jy.mongodb.net:27017/BlockPesa?ssl=true&replicaSet=mflix-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true });




app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var whitelist = ['http://localhost:8080']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


app.use(cors());

app.use('/blockpesa',express.static('spa'))
// Routers
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");

app.use("/blockpesa/user", userRoutes);
app.use("/blockpesa/account", accountRoutes);

http.listen( PORT, () => console.log(`Server listening on Port ${PORT}`));

const StellarSdk = require('stellar-sdk')
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const Account = require("./models/account.model.js");

const axios = require('axios');

const StellarController = require('./controllers/stellar.functions');
const mainAccount = StellarController.createAccount();
console.log(mainAccount);
(async ()=> {
	const res = await axios.get(
        `https://friendbot.stellar.org?addr=${mainAccount.publicKey}`
    );
    console.log(res.data);
})()


app.post('/blockpesa/mpesa/:pub', (req, res) => {
	const amount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value
	StellarController.sendMoney(mainAccount.secretSeed, req.params.pub, ''+amount);
})

const {format} = require('date-fns');
const btoa = require('btoa');
app.post('/blockpesa/deposit', async (req, res) => {
  const {phoneNumber, amountToDeposit, publicKey} = req.body;
  const generateTimeStamp = format(new Date(), "yyyyMMddHHmmss");

      const generatePassword = btoa(
        `174379bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919${generateTimeStamp}`
      );

      let response = await axios.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        {
          auth: {
            username: "V7UPVA8WZcvg4IigMMX2QtK0oxsf6ZBy",
            password: "UWKKx8ar78BgnDZW"
          }
        }
      );
      const accessToken = response.data.access_token;

      await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          BusinessShortCode: "174379",
          Password: generatePassword,
          Timestamp: generateTimeStamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: ''+amountToDeposit,
          PartyA: ''+phoneNumber,
          PartyB: "174379",
          PhoneNumber: ''+phoneNumber,
          CallBackURL: `https://horizonedge.tech/blockpesa/mpesa/${publicKey}`,
          AccountReference: "BCASH Kenya",
          TransactionDesc: "BCaSh"
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );

      return res.json({
        message: "Commit"
      })
})

// Get a message any time a payment occurs. Cursor is set to "now" to be notified
// of payments happening starting from when this script runs (as opposed to from
// the beginning of time).
const es = server.payments()
  .cursor('now')
  .stream({
    onmessage: async (message) => {
      
      const {from, to} = message;
      const accounts = await Account.find({publicKey: {$in: [from, to]}})
      if (accounts.length > 0) {
        console.log(message);
      	io.emit('transaction', {...message, accounts})
      }
    }
  })