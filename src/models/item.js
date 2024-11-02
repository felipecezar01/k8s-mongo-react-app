const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   completed: {
      type: Boolean,
      default: false,
   },
   userId: {  // Adiciona o campo userId para associar o item ao usuário
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }
});

module.exports = mongoose.model('Item', ItemSchema);
