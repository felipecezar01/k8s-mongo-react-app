require('dotenv').config();
console.log("Variáveis de ambiente:", process.env);
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Verificação do MONGO_URI
if (!process.env.MONGO_URI) {
   console.error("Erro: MONGO_URI não definido nas variáveis de ambiente.");
   process.exit(1);
}

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB conectado"))
   .catch(err => {
      console.error("Erro ao conectar ao MongoDB:", err);
      process.exit(1); // Termina o processo se houver erro
   });

// Importar as rotas de autenticação e de itens
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes'); // Adicionando a rota de itens

// Usar as rotas
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // Configurando a rota de itens

// Exemplo de rota de criação de usuário com logs
app.post('/api/auth/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Exibindo os dados recebidos
        console.log("Dados recebidos para registro:", { username, password });

        const novoUsuario = new User({ username, password });

        // Exibindo o objeto usuário antes do salvamento
        console.log("Tentando salvar o usuário no MongoDB:", novoUsuario);

        await novoUsuario.save();
        console.log("Usuário registrado com sucesso!");

        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar usuário no MongoDB:", error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Configurar porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
