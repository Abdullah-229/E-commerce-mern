const express = require("express");
const { addQuestion, getQuestionsByProduct, answerQuestion } = require("./QuestionController");
const router = express.Router();

router.post("/", addQuestion);
router.get("/:productId", getQuestionsByProduct);
router.put("/:id", answerQuestion);

module.exports = router;
