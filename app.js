const express = require("express"),
  bodyParser = require("body-parser"),
  cors = require("cors"),
  mongoose = require("mongoose"),
  morgan = require("morgan"),
  config = require("config"),
  app = express();

const PORT = config.get("app.port");
const db = config.get("db.name");

mongoose.connect(`mongodb://localhost:27017/${db}`, { useNewUrlParser: true });

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
