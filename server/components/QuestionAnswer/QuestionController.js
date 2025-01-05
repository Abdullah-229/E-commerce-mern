const Question = require("./QuestionModel")

exports.addQuestion = async (req, res) => {
    try {
        const { productId, question, customerName } = req.body;
        const newQuestion = new Question({ productId, question, customerName });
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to add question" });
    }
};

exports.getQuestionsByProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const questions = await Question.find({ productId });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
};

exports.answerQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer, sellerName } = req.body;
        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { answer, sellerName },
            { new: true }
        );
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to answer question" });
    }
};
