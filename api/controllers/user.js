module.exports = () => {
    const controller = {};

    controller.createUser = (req, res) => {
      const { id, name, email } = req.body;
      const query = 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';
      connection.query(query, [id, name, email], (err, results) => {
        if (err) {
          console.error('Erro ao criar usuário:', err);
          res.status(500).json({ error: 'Erro ao criar usuário' });
          return;
        }
        res.status(201).json({ id, name, email });
      });
    };
    
    controller.getUsers = (req, res) => {
      const query = 'SELECT * FROM users';
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao obter usuários:', err);
          res.status(500).json({ error: 'Erro ao obter usuários' });
          return;
        }
        res.json(results);
      });
    };
    
    controller.getUserById = (req, res) => {
      const { id } = req.params;
      const query = 'SELECT * FROM users WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          console.error('Erro ao obter usuário:', err);
          res.status(500).json({ error: 'Erro ao obter usuário' });
          return;
        }
        if (results.length > 0) {
          res.json(results[0]);
        } else {
          res.status(404).json({ error: 'Usuário não encontrado' });
        }
      });
    };
    
    controller.updateUser = (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
      connection.query(query, [name, email, id], (err, results) => {
        if (err) {
          console.error('Erro ao atualizar usuário:', err);
          res.status(500).json({ error: 'Erro ao atualizar usuário' });
          return;
        }
        if (results.affectedRows > 0) {
          res.json({ id, name, email });
        } else {
          res.status(404).json({ error: 'Usuário não encontrado' });
        }
      });
    };
    
    controller.deleteUser = (req, res) => {
      const { id } = req.params;
      const query = 'DELETE FROM users WHERE id = ?';
      connection.query(query, [id], (err, results) => {
        if (err) {
          console.error('Erro ao excluir usuário:', err);
          res.status(500).json({ error: 'Erro ao excluir usuário' });
          return;
        }
        if (results.affectedRows > 0) {
          res.json({ id });
        } else {
          res.status(404).json({ error: 'Usuário não encontrado' });
        }
      });
    };
    
    return controller;
  }

  //O module.exports é usado para expor o conteúdo de um módulo e torná-lo acessível para outros arquivos do seu projeto. No caso o module.exports retorna a arrow function que contem a const
  //'controller' com seus métodos, no caso o crud. Depois de usar o module.exports podemos usar o "require()" nos outros arquivos para trazer o que o module.exports inclue. No caso o controller...
  // Usando o require apontando para esse arquivo, retornaremos a "classe" controller...