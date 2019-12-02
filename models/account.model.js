const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  secretSeed: {
    type: String,
    required: true
  },
  publicKey: {
    type: String,
    required: true
  },
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Account", AccountSchema);
