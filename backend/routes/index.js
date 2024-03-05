// import express from "express";
const userRouter = require ("./user.js")
const accountRouter = require ("./account.js")

const express = require("express");

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account", accountRouter);

module.exports = rootRouter