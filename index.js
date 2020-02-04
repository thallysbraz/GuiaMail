const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");

// View engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: "f766d328792557bb583ac249bdd0810b",
    cookie: { maxAge: 30000000 },
    saveUninitialized: true,
    resave: true
  })
);

app.use(express.static("public"));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Router

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// End Router
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
