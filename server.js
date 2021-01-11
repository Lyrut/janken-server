const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./app");
const { models } = require("./app");

const routes = {
  users: require("./app/controllers/users.controller"),
  // games: require("./app/controllers/games.controller"),
  handsigns: require("./app/controllers/handsigns.controller"),
  // player_1: require("./app/controllers/player_1.controller"),
  // player_2: require("./app/controllers/player_2.controller"),
};

function makeHandlerAwareOfAsyncErrors(handler) {
  return async function (req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  const force = true;

  try {
    await sequelize.authenticate();
    if (force) {
      await sequelize.sync({ force: true });
      await models.handsigns.create({ name: "Pierre" });
      await models.handsigns.create({ name: "Feuille" });
      await models.handsigns.create({ name: "Ciseau" });
    } else {
      await sequelize.sync();
    }

    console.log("Database connection OK!");
  } catch (error) {
    console.log("Unable to connect to the database:");
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}.`);
  });
}

const app = express();

var corsOptions = {
  origin: "http://localhost:2301",
};
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: `Welcome to janken server` });
});

for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    app.get(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.getAll)
    );
  }
  if (routeController.getById) {
    app.get(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.getById)
    );
  }
  if (routeController.create) {
    app.post(
      `/api/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.create)
    );
  }
  if (routeController.update) {
    app.put(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.update)
    );
  }
  if (routeController.remove) {
    app.delete(
      `/api/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.remove)
    );
  }
}

init();
