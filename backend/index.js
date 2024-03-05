// backend/index.js
const express = require("express");
const rootRouter = require("./routes/index");
// const accountRouter = require("./routes/account");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.use("/api/v1", rootRouter);





app.listen(3000)

// module.exports = app




