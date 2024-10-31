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
});

module.exports = mongoose.model('Item', ItemSchema);
