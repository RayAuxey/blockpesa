const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  config = require("config"),
  app = express();

const PORT = config.get("app.port");
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

app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));
