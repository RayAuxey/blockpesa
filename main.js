const axios = require("axios");
const fs = require("fs");

const accounts = require("./accounts.json");

const StellarSdk = require("stellar-sdk");
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const createAccount = name => {
  let account = {
    name
  };
  const pair = StellarSdk.Keypair.random();
  const secretSeed = pair.secret();
  const publicKey = pair.publicKey();
  account = { ...account, secretSeed, publicKey };
  console.log(account);
  return account;
};

// console.log(createAccount("Ray"));

const getBalances = async publicKey => {
  try {
    const account = await server.loadAccount(publicKey);
    const balances = [];
    account.balances.forEach(balance => {
      balances.push({
        type: balance.asset_type,
        balance: balance.balance
      });
    });
    return balances;
  } catch (err) {
    console.log("err", err);
  }
};

(async () => {
  // sendMoney(accounts[0].secretSeed, accounts[1].publicKey, "200");
  const balance = await getBalances(accounts[0].publicKey);
  console.log(balance);
})();

// let newAccounts = [];

// for (let i = 0; i < 3; i++) {
//   newAccounts.push(createAccount("stl"));
// }

// fs.writeFile("accounts.json", JSON.stringify(newAccounts), err => {
//   if (err) console.log("Err", err);
//   else console.log("Success");
// });

function sendMoney(secretSeed, destinationId, amount) {
  const sourceKeys = StellarSdk.Keypair.fromSecret(secretSeed);
  let transaction;
  server
    .loadAccount(destinationId)
    .catch(err => {
      throw new Error("The destination account does not exist!");
    })
    .then(() => server.loadAccount(sourceKeys.publicKey()))
    .then(sourceAccount => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: 100
      })
        .addOperation(
          StellarSdk.Operation.payment({
            destination: destinationId,
            asset: StellarSdk.Asset.native(),
            amount
          })
        )
        .addMemo(StellarSdk.Memo.text("First transfer"))
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeys);

      return server.submitTransaction(transaction);
    })
    .then(res => console.log("Success!:", res))
    .catch(err => console.log("Error!", err));
}
// let account;

// fs.readFile("accounts.json", async (err, data) => {
//   if (err) {
//     console.log("Error:", err);
//     return;
//   }
//   account = JSON.parse(data);
//   const balance = await getBalances(account.publicKey);
//   console.log(JSON.stringify(balance));
// });

// createAccount("Raymond");

// (async () => {
//   try {
//     const response = await axios.get(
//       `https://friendbot.stellar.org?addr=${encodeURIComponent(
//         pair.publicKey()
//       )}`
//     );
//     const responseJSON = await response.data;

//     const account = await server.loadAccount(pair.publicKey());
//     console.log("Balances for account: " + pair.publicKey());
//     account.balances.forEach(function(balance) {
//       console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
//     });
//     // console.log("SUCCESS! You have a new account :)\n", responseJSON);
//   } catch (e) {
//     console.error("ERROR!", e);
//   }
// })();
