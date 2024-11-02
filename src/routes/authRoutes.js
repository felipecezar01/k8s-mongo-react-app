const express = require('express');
const { register, login, updateProfile } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // Middleware para verificar autenticação
const router = express.Router();

router.post('/register', (req, res, next) => {
   console.log("Rota de registro acessada");
   next();
}, register);

router.post('/login', (req, res, next) => {
   console.log("Rota de login acessada");
   next();
}, login);

// Rota para atualizar perfil (protegida por autenticação)
router.put('/profile', auth, (req, res, next) => {
   console.log("Rota de atualização de perfil acessada pelo usuário ID:", req.user.userId);
   next();
}, updateProfile);

module.exports = router;
