module.exports = app => {
    const controller = require('../controllers/users')();
  
    app.post('/users', controller.createUser);
    app.get('/users', controller.getUsers);
    app.get('/users/:id', controller.getUserById);
    app.put('/users/:id', controller.updateUser);
    app.delete('/users/:id', controller.deleteUser);
    
  }