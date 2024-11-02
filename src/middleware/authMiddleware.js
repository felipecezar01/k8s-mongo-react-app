const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
   // Verifica se o token está presente no cabeçalho de autorização
   const authHeader = req.header('Authorization');
   if (!authHeader) {
      return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
   }

   // Remove o prefixo "Bearer " do token
   const token = authHeader.replace('Bearer ', '');
   if (!token) {
      return res.status(401).json({ message: "Acesso negado. Token não encontrado." });
   }

   try {
      // Verifica e decodifica o token JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Atribui o payload do token (incluindo userId) ao req.user
      next(); // Prossegue para o próximo middleware ou controlador
   } catch (error) {
      console.error("Erro de autenticação:", error.message);
      res.status(400).json({ message: "Token inválido." });
   }
};
