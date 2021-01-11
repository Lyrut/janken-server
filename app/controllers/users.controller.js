const { models } = require("../index");
const { getIdParam } = require("./helpers");

async function getAll(req, res) {
  const users = await models.users.findAll();
  res.status(200).json(users);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const user = await models.users.findByPk(id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).send("404 - Not found");
  }
}

async function create(req, res) {
  if (req.body.id) {
    res
      .status(400)
      .send(
        `Bad request: ID should not be provided, since it is determined automatically by the database.`
      );
  } else {
    await models.users.create(req.body);
    res.status(201).end();
  }
}

async function update(req, res) {
  const id = getIdParam(req);

  if (req.body.id === id) {
    await models.users.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } else {
    res
      .status(400)
      .send(
        `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`
      );
  }
}

async function remove(req, res) {
  const id = getIdParam(req);
  await models.users.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).end();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
