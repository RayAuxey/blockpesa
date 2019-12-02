const Account = require("../models/account.model");
const StellarSdk = require("stellar-sdk");
const axios = require("axios");

const StellarController = require("./stellar.functions");

StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server("https://horizon-testnet.stellar.org");

class AccountController {
  static async create(req, res) {
    try {
      const { userId, name } = req.body;
      const newAccount = Account({
        user: userId,
        ...StellarController.createAccount(name)
      });

      const savedDoc = await newAccount.save();
      return res.status(201).json({
        message: "Succesfully created new Account",
        savedDoc
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error
      });
    }
  }

  static async show(req, res) {
    try {
      const { userId } = req.params;
      const accounts = await Account.find({ user: userId })
        .populate("user")
        .exec();
      return res.status(200).json(accounts);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error
      });
    }
  }
  static async showAccount(req, res) {
    try {
      const { userId , _id} = req.params;
      const accounts = await Account.findOne({ user: userId , _id })
        .populate("user")
        .exec();
      return res.status(200).json(accounts);
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        error
      });
    }
  }

  static async fundAccount(req, res) {
    try {
      const { id } = req.params;
      const { publicKey } = await Account.findById(id);

      const { data } = await axios.get(
        `https://friendbot.stellar.org?addr=${publicKey}`
      );

      return res.json(data);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error });
    }
  }

  static async getBalances(req, res) {
    try {
      const { id } = req.params;
      const { publicKey } = await Account.findById(id);

      const balances = await StellarController.getBalance(publicKey);

      return res.status(200).json(balances);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }

  static async sendMoney(req, res) {
    try {
      const { from: secretSeed, destinationId, amount } = req.body;
      
      const sendResponse = await StellarController.sendMoney(
        secretSeed,
        destinationId,
        amount
      );

      return res.status(200).json(sendResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  }
}

module.exports = AccountController;
