const express = require('express');
const { register, login, updateProfile } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware'); // Middleware para verificar autenticação
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Rota para atualizar perfil (protegida por autenticação)
router.put('/profile', auth, updateProfile);

module.exports = router;
