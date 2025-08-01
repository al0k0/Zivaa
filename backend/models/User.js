const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },


  // ✅ Add missing fields for account profile
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  avatar: {type: String, default: ""},

  wishlist: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: String,
      price: Number,
      images: [String]
    }
  ],
  cart: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: String,
      price: Number,
      images: [String],
      quantity: { type: Number, default: 1 }
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
