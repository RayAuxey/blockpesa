const axios = require("axios");
const fs = require("fs");

const StellarSdk = require("stellar-sdk");
// StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

(async () => {
  const pair = StellarSdk.Keypair.random();

  pair.secret();

  pair.publicKey();
  try {
    const response = await axios(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        pair.publicKey()
      )}`
    );
    const responseJSON = await response.data;
    console.log("SUCCESS! You have a new account :)\n", responseJSON);

    const account = await server.loadAccount(pair.publicKey());
    console.log("Balances for account: " + pair.publicKey());
    account.balances.forEach(function(balance) {
      console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
    });
  } catch (e) {
    console.error("ERROR!", e);
  }
})();
