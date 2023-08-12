module.exports = app => {
    const controller = require('../controllers/webhook')();
  
    app.post('/ping', controller.echo);
  
  }