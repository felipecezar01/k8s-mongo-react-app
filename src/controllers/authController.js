const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Registro de um novo usuário
exports.register = async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: "Usuário registrado com sucesso" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Login e geração de token JWT
exports.login = async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "Credenciais inválidas" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Credenciais inválidas" });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

// Atualizar perfil do usuário
exports.updateProfile = async (req, res) => {
   const userId = req.user.userId; // ID do usuário autenticado
   const { username, password, newPassword } = req.body;

   try {
      // Encontrar o usuário no banco de dados
      const user = await User.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Se o usuário quer atualizar a senha, verificar a senha atual
      if (password && newPassword) {
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return res.status(400).json({ message: "Senha atual incorreta" });
         }
         // Atualizar a senha com a nova senha criptografada
         user.password = await bcrypt.hash(newPassword, 10);
      }

      // Atualizar o nome de usuário, se fornecido
      if (username) {
         user.username = username;
      }

      // Salvar as mudanças
      await user.save();
      res.json({ message: "Perfil atualizado com sucesso" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};
