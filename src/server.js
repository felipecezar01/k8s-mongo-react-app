require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log("MongoDB conectado"))
   .catch(err => console.log("Erro ao conectar ao MongoDB:", err));

// Importar as rotas de autenticação e de itens
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes'); // Adicionando a rota de itens

// Usar as rotas
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes); // Configurando a rota de itens

// Configurar porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
