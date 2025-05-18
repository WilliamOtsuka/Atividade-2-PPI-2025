import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/css', express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Middleware para processar dados do formulário
app.use(express.urlencoded({ extended: true }));

app.post('/cadastrar-jogo', (req, res) => {
  try {
    let { nome, plataforma, genero, ano, descricao } = req.body;

    res.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
      <meta charset="UTF-8">
      <title>Jogo cadastrado</title>
      <link rel="stylesheet" href="css/style.css">
      </head>
      <body>
      <div class="box">
        <h2 class="titulo">Jogo cadastrado com sucesso!</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Plataforma:</strong> ${plataforma}</p>
        <p><strong>Gênero:</strong> ${genero}</p>
        <p><strong>Ano de Lançamento:</strong> ${ano}</p>
        <p><strong>Descrição:</strong> ${descricao}</p>
        <a href="/" class="btn">Cadastrar outro jogo</a>
      </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.log('Erro ao cadastrar jogo:', error);
    res.status(500).send('Erro ao cadastrar jogo. Tente novamente mais tarde.');
  }
});

app.listen(3000, function () {
    console.log(`Servidor rodando no http://localhost:3000`);
});