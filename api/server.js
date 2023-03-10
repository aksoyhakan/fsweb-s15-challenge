const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./auth/auth-router.js");
const bilmecelerRouter = require("./bilmeceler/bilmeceler-router.js");
const userRouter = require("./users/user-route");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/bilmeceler", bilmecelerRouter); // sadece giriş yapan kullanıcılar erişebilir!
server.use("/api/users", userRouter);

module.exports = server;
