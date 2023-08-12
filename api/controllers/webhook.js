module.exports = () => {
    const axios = require('axios');
    
    const controller = {};

    controller.echo = async (req, res) => {
      
        const incomingMessage = req.body;

        // Aqui você pode adicionar a lógica para processar a mensagem e preparar a resposta
      
        const responseMessage = {
          to: incomingMessage.from,
          type: 'text',
          text: `Você disse: "${incomingMessage.text}"`,
        };
      
        try {
          // Enviar a mensagem de volta para o usuário via API do WhatsApp Business
          const apiResponse = await axios.post('https://api.whatsapp.com/send', responseMessage);
      
          console.log('Resposta da API do WhatsApp Business:', apiResponse.data);
        } catch (error) {
          console.error('Erro ao enviar mensagem:', error.message);
        }
      
        console.log('Mensagem recebida:', incomingMessage);
        console.log('Mensagem de resposta:', responseMessage);
      
        res.status(200).send('OK');
      
    };
    
    return controller;
  }

  //O module.exports é usado para expor o conteúdo de um módulo e torná-lo acessível para outros arquivos do seu projeto. No caso o module.exports retorna a arrow function que contem a const
  //'controller' com seus métodos, no caso o crud. Depois de usar o module.exports podemos usar o "require()" nos outros arquivos para trazer o que o module.exports inclue. No caso o controller...
  // Usando o require apontando para esse arquivo, retornaremos a "classe" controller...