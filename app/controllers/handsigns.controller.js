const { models } = require("../index");
const { getIdParam } = require("./helpers");

async function getAll(req, res) {
  const handsigns = await models.handsigns.findAll();
  res.status(200).json(handsigns);
}

async function getById(req, res) {
  const id = getIdParam(req);
  const handsign = await models.handsigns.findByPk(id);
  if (handsign) {
    res.status(200).json(handsign);
  } else {
    res.status(404).send("404 - Not found");
  }
}

module.exports = {
  getAll,
  getById,
};
