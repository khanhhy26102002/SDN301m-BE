const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String
}, {
  timestamps: true
});
const category = mongoose.model("Category", categorySchema);
module.exports = category;