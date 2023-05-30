const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');


const connection = mysql.createConnection({
  host: config.get('server.host'),
  user: config.get('server.user'),
  password: config.get('server.password'),
  database: config.get('server.database'),
});

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use(bodyParser.json());

  require('../api/routes/user')(app);

  return app;
};

// 