const db = require("../../data/dbConfig");

async function getAll() {
  return await db("riddles");
}

async function getById(id) {
  return await db("riddles").where({ id }).first();
}

async function addRiddle(riddle) {
  await db("riddles").insert(riddle);
  return await getById(riddle.id);
}

module.exports = { getAll, getById, addRiddle };
