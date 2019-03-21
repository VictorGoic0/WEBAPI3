const express = require("express");
const helmet = require("helmet");
const userRouter = require("./userRoute/router.js");
const postRouter = require("./postRoute/router.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);

module.exports = server;
