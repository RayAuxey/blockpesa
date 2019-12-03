const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  config = require("config"),
  app = express();

var http = require('http').createServer(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 8001;
const db = config.get("db.name");

mongoose.connect(`mongodb://rayauxey:!1Gaishah@mflix-shard-00-00-mk7jy.mongodb.net:27017,mflix-shard-00-01-mk7jy.mongodb.net:27017,mflix-shard-00-02-mk7jy.mongodb.net:27017/BlockPesa?ssl=true&replicaSet=mflix-shard-0&authSource=admin&retryWrites=true&w=majority`, { useNewUrlParser: true });

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routers
const userRoutes = require("./routes/user.routes");
const accountRoutes = require("./routes/account.routes");

app.use("/user", userRoutes);
app.use("/account", accountRoutes);

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


app.post('/mpesa/:_id', (req, res) => {
	const amount = req.body.Body.stkCallback.CallbackMetadata.Item[0].Value
	StellarController.sendMoney(mainAccount.secretSeed, _id, amount);
})

// Get a message any time a payment occurs. Cursor is set to "now" to be notified
// of payments happening starting from when this script runs (as opposed to from
// the beginning of time).
const es = server.payments()
  .cursor('now')
  .stream({
    onmessage: async (message) => {
      
      const {source_account, account} = message;
      const accountInfo = await Account.findOne({publicKey: {$in: [source_account, account]}})
      if (accountInfo) {
        console.log(message);
      	io.emit('transaction', {...message, ...accountInfo});
      }
      
    }
  })