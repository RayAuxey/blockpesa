const StellarSdk = require("stellar-sdk");
StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

class StellarController {
  static createAccount(name) {
    const pair = StellarSdk.Keypair.random();
    const secretSeed = pair.secret();
    const publicKey = pair.publicKey();

    return { name, secretSeed, publicKey };
  }

  static async getBalance(publicKey) {
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
      throw err;
    }
  }

  static async transactions(publicKey) {
    const res = await server.transactions()
    .forAccount(publicKey)
    .call()
    return res.records;
  }

  static async sendMoney(secretSeed, destinationId, amount) {
    const sourceKeys = StellarSdk.Keypair.fromSecret(secretSeed);
    let transaction;
    const res = await server
      .loadAccount(destinationId)
      .catch(err => {
        throw err;
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
      .then(res => {
        console.log("tumefika");
        return res;
      })
      .catch(err => {
        throw err;
      });

    return res;
    // console.log(res);
  }
}

module.exports = StellarController;
