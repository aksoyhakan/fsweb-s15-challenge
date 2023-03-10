const db = require("../../data/dbConfig");

async function dataAdjuster() {
  const allData = await db("users as u")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
    .select("u.*", "r.*");
  let newDataArray = allData.map((data) => {
    return {
      id: data.id,
      username: data.username,
      role: data.rolename,
    };
  });
  return newDataArray;
}

async function dataAdjuster2(userId) {
  const allData = await db("users as u")
    .leftJoin("roles as r", "u.role_id", "r.role_id")
    .select("u.*", "r.*");
  let newDataArray = allData.map((data) => {
    return {
      id: data.id,
      username: data.username,
      password: data.password,
    };
  });

  let returnObj = newDataArray.find((data) => data.id == userId);
  return returnObj;
}

async function getAll() {
  return await dataAdjuster();
}

async function getById(id) {
  const allData = await dataAdjuster();
  const searchedUser = allData.find((data) => data.id == id);
  return searchedUser;
}

async function addUser(user) {
  let created_user_id;
  await db.transaction(async (trx) => {
    let role_id_to_use;
    const [role] = await trx("roles").where("rolename", user.rolename);
    if (role) {
      role_id_to_use = role.role_id;
    } else {
      const [role_id] = await trx("roles").insert({ rolename: user.rolename });
      role_id_to_use = role_id;
    }
    const [user_id] = await trx("users").insert({
      username: user.username,
      password: user.password,
      role_id: role_id_to_use,
    });
    created_user_id = user_id;
  });
  return dataAdjuster2(created_user_id);
}

module.exports = { getAll, getById, addUser };
