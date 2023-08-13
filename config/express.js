const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const mysql = require('mysql2');
const config = require("config");

const connection = mysql.createConnection({
  host: config.get("server.host"),
  user: config.get("server.user"),
  password: config.get("server.password"),
  database: config.get("server.database"),
});

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set("port", process.env.PORT || config.get("server.port"));

  // MIDDLEWARES
  app.use(bodyParser.json());


  //Isso aqui é aonde ele faz o gerenciamento de sessões no banco de dados.
  app.use(
    session({
      secret: "seu-segredo-aqui",
      resave: false,
      saveUninitialized: true,
      store: new (require("express-mysql-session"))(
        {
          clearExpired: true,
          checkExpirationInterval: 900000, // Verifica a cada 15 minutos
          expiration: 86400000, // Expira em 1 dia
        },
        connection
      ),
    })
  );


  //Debug logger
  var myLogger = function (req, res, next) {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();

    var logFile =
      "C:/Users/Gabri/Desktop/Projetos/Estudo-API-NodeJs/log/" +
      date +
      "-" +
      month +
      ".txt";
    const fs = require("fs");

    var divider =
      "----------------------------------------------------------------\n";
    var dataHora =
      divider +
      "Dia da Requisição: " +
      date +
      "/" +
      month +
      "/" +
      year +
      "\n" +
      "Horário: " +
      hours +
      ":" +
      minutes +
      "\n";
    var endereco =
      "Endpoint: " +
      req.protocol +
      "://" +
      req.hostname +
      req.originalUrl +
      "\n";
    var BodyReq =
      "\n ---- BODY REQUISIÇÃO ---- \n" + JSON.stringify(req.body) + "\n";
    var BodyRes =
      "\n ---- RESPONSE ---- \n" + JSON.stringify(res.body) + "\n" + divider;

    var Conteudo = dataHora + endereco + BodyReq + BodyRes;

    fs.writeFile(logFile, Conteudo, { flag: "a+" }, function (err) {
      if (err) throw err;
    });

    next();
  };

  app.use(myLogger);

  require("../api/routes/user")(app);

  return app;
};

//
