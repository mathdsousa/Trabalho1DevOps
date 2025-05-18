const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];  // "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ erro: 'Token inválido' });
    }
    
    req.user = decoded;  // Adiciona as informações do usuário ao objeto de requisição
    next();  // Passa para o próximo middleware ou rota
  });
}

module.exports = verificarToken;  // Exporta o middleware


