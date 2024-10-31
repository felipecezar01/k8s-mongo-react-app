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
