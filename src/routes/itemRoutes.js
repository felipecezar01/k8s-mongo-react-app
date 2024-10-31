const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const auth = require('../middleware/authMiddleware');  // Middleware para autenticação

// Criar um novo item (rota protegida)
router.post('/', auth, async (req, res) => {
   try {
      const newItem = new Item({
         ...req.body,
         userId: req.user.userId  // Associa o item ao usuário autenticado
      });
      const savedItem = await newItem.save();
      res.json(savedItem);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Listar todos os itens do usuário autenticado
router.get('/', auth, async (req, res) => {
   try {
      const items = await Item.find({ userId: req.user.userId });  // Busca itens pelo ID do usuário
      res.json(items);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Atualizar um item específico (rota protegida)
router.put('/:id', auth, async (req, res) => {
   try {
      const updatedItem = await Item.findOneAndUpdate(
         { _id: req.params.id, userId: req.user.userId },
         req.body,
         { new: true }
      );
      if (!updatedItem) return res.status(404).json({ message: "Item não encontrado" });
      res.json(updatedItem);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Excluir um item específico (rota protegida)
router.delete('/:id', auth, async (req, res) => {
   try {
      const deletedItem = await Item.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
      if (!deletedItem) return res.status(404).json({ message: "Item não encontrado" });
      res.json({ message: "Item deletado com sucesso" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
