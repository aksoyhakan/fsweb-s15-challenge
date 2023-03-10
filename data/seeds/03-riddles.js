/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const riddleData = [
  {
    id: "123Dh34TyTn",
    riddle: "Bir kamyonu kim tek eliyle durdurabilir?",
  },
  {
    id: "34EE0543eSk",
    riddle: "Yürür iz etmez, hızlansa toz etmez",
  },
  {
    id: "Mlt54Tm598l",
    riddle: "Dört ayağı olsa da adım atamaz",
  },
];

exports.riddleData = riddleData;

exports.seed = async function (knex) {
  return await knex("riddles").insert(riddleData);
};
