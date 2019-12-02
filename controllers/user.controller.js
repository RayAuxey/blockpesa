const User = require("../models/user.model");

class UserController {
  static async create(req, res) {
    try {
      const { name, password } = req.body;
      const newUser = User({
        name,
        password
      });
      const savedDoc = await newUser.save();
      return res.status(201).json(savedDoc);
    } catch (error) {
      return res.status(500).json({
        Error: error
      });
    }
  }

  static async index(req, res) {
    try {
      const docs = await User.find({}).exec();
      return res.status(200).json(docs);
    } catch (error) {
      return res.status(500).json({
        Error: error
      });
    }
  }
}

module.exports = UserController;
