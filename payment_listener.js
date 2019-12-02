const StellarSdk = require("stellar-sdk");
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

const accounts = require("./accounts.json");

const accountId = accounts[1].publicKey;

const payments = server.payments().forAccount(accountId);

payments.stream({
  onmessage: function(payment) {
    // Record the paging token so we can start from here next time.
    // The payments stream includes both sent and received payments. We only
    // want to process received payments here.
    if (payment.to !== accountId) {
      return;
    }

    // In Stellar’s API, Lumens are referred to as the “native” type. Other
    // asset types have more detailed information.
    var asset;
    if (payment.asset_type === "native") {
      asset = "lumens";
    } else {
      asset = payment.asset_code + ":" + payment.asset_issuer;
    }

    console.log(payment.amount + " " + asset + " from " + payment.from);
  },

  onerror: function(error) {
    console.error("Error in payment stream");
  }
});
