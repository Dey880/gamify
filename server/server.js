const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes.js");
const gameRoutes = require("./routes/gameRoutes.js")
const tagRoutes = require("./routes/tagRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const cookieParser = require("cookie-parser");

const app = express();

let corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());

mongoose.connect(process.env.DB_URL);

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use("/api/auth", authRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.send("Hellaow!:3");
});

app.listen(process.env.PORT);