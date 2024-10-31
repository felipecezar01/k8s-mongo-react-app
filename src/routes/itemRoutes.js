const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Criar um novo item
router.post('/', async (req, res) => {
   try {
      const newItem = new Item(req.body);
      const savedItem = await newItem.save();
      res.json(savedItem);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Listar todos os itens
router.get('/', async (req, res) => {
   try {
      const items = await Item.find();
      res.json(items);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Atualizar um item
router.put('/:id', async (req, res) => {
   try {
      const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedItem);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// Excluir um item
router.delete('/:id', async (req, res) => {
   try {
      await Item.findByIdAndDelete(req.params.id);
      res.json({ message: "Item deletado com sucesso" });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
