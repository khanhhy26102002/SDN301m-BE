const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: { type: String },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  {
    timestamps: true
  }
);
const product = mongoose.model("Product", productSchema);
module.exports = product;
