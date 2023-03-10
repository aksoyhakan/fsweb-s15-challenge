const router = require("express").Router();
const bcrypt = require("bcryptjs");
const authMd = require("./auth-middleware");
const UserModels = require("../users/user-model");
const { JWT_SECRET } = require("../secret/secret");
const jwt = require("jsonwebtoken");
const db = require("../../data/dbConfig");

router.post(
  "/register",
  authMd.checkPayload,
  authMd.uniqueUsername,
  (req, res, next) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashPassword;

    UserModels.addUser(req.body)
      .then((response) => {
        response
          ? res.status(201).json(response)
          : next({ status: 404, message: "You could not regist" });
      })
      .catch((err) => next({ status: 500, message: "database problem" }));

    /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.
    2^8 HASH TURUNU AŞMAYIN!

    1- Yeni bir hesap kaydetmek için istemci "kullanıcı adı" ve "şifre" sağlamalıdır:
      {
        "username": "Captain Marvel", // `users` tablosunda var olmalıdır
        "password": "foobar"          // kaydedilmeden hashlenmelidir
      }

    2- BAŞARILI kayıtta,
      response body `id`, `username` ve `password` içermelidir:
      {
        "id": 1,
        "username": "Captain Marvel",
        "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
      }

    3- Request bodyde `username` ya da `password` yoksa BAŞARISIZ kayıtta,
      response body şunu içermelidir: "username ve şifre gereklidir".

    4- Kullanıcı adı alınmışsa BAŞARISIZ kayıtta,
      şu mesajı içermelidir: "username alınmış".
  */
  }
);

router.post(
  "/login",
  authMd.checkPayload2,
  authMd.checkUsernameExisting,
  async (req, res, next) => {
    const searchedUser = await db("users")
      .leftJoin("roles", "users.role_id", "roles.role_id")
      .where("username", req.body.username)
      .first();
    const passwordStatus = bcrypt.compareSync(
      req.body.password,
      searchedUser.password
    );

    if (passwordStatus) {
      const token = generateToken(searchedUser);

      res
        .status(200)
        .json({ message: `Welcome, ${req.body.username}`, token: token });
    } else {
      next({ status: 404, message: "invalid input" });
    }
    /*
    EKLEYİN
    Uçnoktanın işlevselliğine yardımcı olmak için middlewarelar yazabilirsiniz.

    1- Var olan bir kullanıcı giriş yapabilmek için bir `username` ve `password` sağlamalıdır:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- BAŞARILI girişte,
      response body `message` ve `token` içermelidir:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- req body de `username` ya da `password` yoksa BAŞARISIZ giriş,
      şu mesajı içermelidir: "username ve password gereklidir".

    4- "username" db de yoksa ya da "password" yanlışsa BAŞARISIZ giriş,
      şu mesajı içermelidir: "geçersiz kriterler".
  */
  }
);

function generateToken(user) {
  let payload = {
    subject: user.id,
    username: user.username,
    rolename: user.rolename,
  };

  let option = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, JWT_SECRET, option);
}
router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});
module.exports = router;
