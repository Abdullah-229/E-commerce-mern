import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import PropTypes from 'prop-types';

const ProductDetails = ({ user }) => {
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        description: '',
    });
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/questions/${id}`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };

        fetchProduct();
        fetchQuestions();
    }, [id]);

    const handleAskQuestion = async () => {
        if (!newQuestion) return;

        try {
            const response = await axios.post(`http://localhost:5000/api/questions`, {
                productId: id,
                question: newQuestion,
                customerName: user.username,
            });
            setQuestions([...questions, response.data]);
            setNewQuestion("");
        } catch (error) {
            console.error("Error asking question:", error);
        }
    };

    const handleAnswerQuestion = async (questionId) => {
        if (!answer) return;

        try {
            await axios.put(`http://localhost:5000/api/questions/${questionId}`, {
                answer,
                sellerName: user.username,
            });
            setAnswer("");
            toast.success("Answer added successfully");
        } catch (error) {
            console.error("Error answering question:", error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="flex flex-col space-y-6 p-4">
            <div className="flex space-x-6">
                <img src={product.image} alt={product.name} className="w-1/2" />
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-green-500 font-bold">${product.price}</p>
                    {user.role === "customer" ? (
                        <button className="bg-green-500 text-white p-2 rounded">Add to Cart</button>
                    ) : (
                        <button className="bg-yellow-500 text-white p-2 rounded">Update Product</button>
                    )}
                    <p>{product.description}</p>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold">Questions & Answers</h2>
                {questions.map((q) => (
                    <div key={q._id} className="p-2 border-b">
                        <p><strong>{q.customerName}:</strong> {q.question}</p>
                        {q.answer ? (
                            <p><strong>Seller ({q.sellerName}):</strong> {q.answer}</p>
                        ) : user.role === "seller" ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Answer this question"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className="border p-1"
                                />
                                <button onClick={() => handleAnswerQuestion(q._id)} className="ml-2 bg-blue-500 text-white p-1 rounded">
                                    Submit
                                </button>
                            </div>
                        ) : null}
                    </div>
                ))}
                {user.role === "customer" && (
                    <div>
                        <input
                            type="text"
                            placeholder="Ask a question"
                            value={newQuestion}
                            onChange={(e) => setNewQuestion(e.target.value)}
                            className="border p-1"
                        />
                        <button onClick={handleAskQuestion} className="ml-2 bg-blue-500 text-white p-1 rounded">Ask</button>
                    </div>
                )}
            </div>
        </div>
    );
};
ProductDetails.propTypes = {
    product: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default ProductDetails;
