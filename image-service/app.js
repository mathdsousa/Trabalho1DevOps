const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 3007;
const storage = multer.memoryStorage(); // ← permite acessar buffer e body juntos
const upload = multer({ storage });

app.use(cors());
app.use('/imagens', express.static(path.join(__dirname, 'imagens')));

app.post('/upload', upload.single('imagem'), (req, res) => {

  console.log('Oi');

  if (!req.file) {
    return res.status(400).json({ erro: 'Nenhum arquivo enviado.' });
  }

  const { originalname, mimetype, buffer } = req.file;
  const post_id = req.body.post_id; // deve bater com o nome usado no formData

  const sql = 'INSERT INTO imagem (nome, tipo, dados, post_id) VALUES (?, ?, ?, ?)';

  db.query(sql, [originalname, mimetype, buffer, post_id], (err, result) => {
    if (err) {
      console.error('Erro ao salvar imagem:', err);
      return res.status(500).json({ erro: 'Erro ao salvar imagem.' });
    }
    res.json({ id: result.insertId, mensagem: 'Imagem salva com sucesso!' });
  });
});

 app.get('/download/:post_id', (req, res) => {
   const id = req.params.post_id;
   const sql = 'SELECT * FROM imagem WHERE post_id = ?';
   db.query(sql, [id], (err, results) => {
     if (err) return res.status(404).send('Erro ao obter a imagem não encontrada.');
     if (results.length === 0) return res.json({mensagem: 'Nenhuma imagem encontrada para este post.'});

     const imagem = results[0];
     const caminho = path.join(__dirname, 'imagens', imagem.nome);

     if (!fs.existsSync(caminho)) {fs.writeFileSync(caminho, imagem.dados)};
     res.json({ mensagem: `Imagem salva na pasta imagens como ${imagem.nome}`, nome_imagem: imagem.nome });
   });
 });

app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});


// Lembrar de instalar esses pacotes:

// npm init -y
// npm install express multer mysql2