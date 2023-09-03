const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_DB,
  },
});

console.log(db.select("*").from("users"));

app.get("/", (req, res) => {
  res.send("success");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  Image.handleImage(req, res, db);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

/*

/--> res = working

/signin --> POST =success/fail
/register --> POst = new user
/profile/:uderId --> Get =user
/image --> PUT --> user (user rank)

*/
