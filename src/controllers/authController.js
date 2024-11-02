const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Registro de um novo usuário
exports.register = async (req, res) => {
   const { username, password } = req.body;
   try {
      console.log("Iniciando registro de usuário:", req.body); // Log dos dados recebidos para registro
      
      // Criação do novo usuário
      const user = new User({ username, password });
      console.log("Tentando salvar o usuário no MongoDB:", user); // Log antes do salvamento
      
      await user.save();
      console.log("Usuário registrado com sucesso!"); // Log de sucesso
      
      res.status(201).json({ message: "Usuário registrado com sucesso" });
   } catch (error) {
      console.error("Erro ao registrar usuário:", error.message); // Log do erro
      res.status(500).json({ message: error.message });
   }
};

// Login e geração de token JWT
exports.login = async (req, res) => {
   const { username, password } = req.body;
   try {
      console.log("Iniciando login para o usuário:", username); // Log do nome de usuário recebido
      
      const user = await User.findOne({ username });
      if (!user) {
         console.log("Usuário não encontrado"); // Log se o usuário não existir
         return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Comparação de senha:", isMatch); // Log do resultado da comparação de senha

      if (!isMatch) {
         console.log("Senha incorreta"); // Log se a senha estiver incorreta
         return res.status(400).json({ message: "Credenciais inválidas" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("Token JWT gerado com sucesso"); // Log do sucesso na geração do token

      res.json({ token });
   } catch (error) {
      console.error("Erro no login:", error.message); // Log do erro
      res.status(500).json({ message: error.message });
   }
};

// Atualizar perfil do usuário
exports.updateProfile = async (req, res) => {
   const userId = req.user.userId; // ID do usuário autenticado
   const { username, password, newPassword } = req.body;

   try {
      console.log("Iniciando atualização do perfil para o usuário ID:", userId); // Log do ID do usuário autenticado
      
      const user = await User.findById(userId);
      if (!user) {
         console.log("Usuário não encontrado durante a atualização"); // Log se o usuário não for encontrado
         return res.status(404).json({ message: "Usuário não encontrado" });
      }

      // Verificar se o usuário quer atualizar a senha
      if (password && newPassword) {
         const isMatch = await bcrypt.compare(password, user.password);
         console.log("Comparação da senha atual:", isMatch); // Log do resultado da comparação de senha

         if (!isMatch) {
            console.log("Senha atual incorreta"); // Log se a senha atual estiver incorreta
            return res.status(400).json({ message: "Senha atual incorreta" });
         }
         user.password = await bcrypt.hash(newPassword, 10);
         console.log("Senha atualizada com sucesso"); // Log após a atualização da senha
      }

      // Atualizar o nome de usuário, se fornecido
      if (username) {
         user.username = username;
         console.log("Nome de usuário atualizado para:", username); // Log do novo nome de usuário
      }

      // Salvar as mudanças
      await user.save();
      console.log("Perfil atualizado com sucesso"); // Log de sucesso

      res.json({ message: "Perfil atualizado com sucesso" });
   } catch (error) {
      console.error("Erro ao atualizar o perfil:", error.message); // Log do erro
      res.status(500).json({ message: error.message });
   }
};
