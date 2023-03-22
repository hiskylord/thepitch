const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: {
    type: String,
    require: true,
    lowercase: true,
  },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  price: { type: Number, required: true },
  photos: { type: Array, required: true },
  thumbnails: { type: Array, required: true },
  views: { type: Number, required: true,default:0 },
  license: { type: String, required: true },
  content: { type: String, required: true },
  guide: { type: String, required: true },
  likes: { type: Number, required: true,default:0 },
  sales: { type: Number, required: true,default:0 },
  discount: { type: Number, required: true,default:0 },
  promoted: { type: Boolean, default: false, required: true },
  preview: { type: String, required: false },
  tags: { type: String, required: false,default: 'buy,website,app,start,online,business,ecommerce,shipping,consignment' },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  lastUpdated: {
    type: Date,
    default: () => Date.now(),
  },
  status: { type: String, default: "PENDING", required: true },
});

module.exports = mongoose.models.Items || mongoose.model("Items", itemsSchema);
