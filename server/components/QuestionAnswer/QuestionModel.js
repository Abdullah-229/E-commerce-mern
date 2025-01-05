const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    question: { type: String, required: true },
    customerName: { type: String, required: true },
    answer: { type: String, default: null },
    sellerName: { type: String, default: null },
});

module.exports = mongoose.model("Question", QuestionSchema);
