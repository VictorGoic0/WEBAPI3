const express = require("express");

const server = express();

const userRouter = require("./userRoute/router.js");
const postRouter = require("./postRoute/router.js");
const helmet = require("helmet");

server.use(express.json());
server.use(helmet());
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
