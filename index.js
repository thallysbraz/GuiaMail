const express = require("express");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
require("dotenv/config");

//Iniciando server express
const app = express();

//Rota de planos
const PlansRouter = require("./routes/PlansRouter");

// View engine
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 30000000 },
    saveUninitialized: true,
    resave: true
  })
);

app.use(flash());

app.use(express.static("public"));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.use('/', PlansRouter); //Rota de planos

app.get('/', (req, res) => {
  res.render('index.ejs');
}); //Rota raiz

// End Router

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`O servidor está rodando na porta ${PORT}`);
});
