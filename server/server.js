const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserController = require("./components/UserRegister/UserController");
const LoginController = require("./components/UserLogin/LoginController");
const ProductRouter = require("./components/Product/ProductController");
const CartRouter = require("./components/Cart/CartController");
const QuestionRoutes = require("./components/QuestionAnswer/QuestionRoutes")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post("/api/register", UserController.registerUser);
app.post("/api/login", LoginController);

app.get("/api/users", UserController.getAllUsers);
app.put("/api/users/:id", UserController.updateUser);
app.delete("/api/users/:id", UserController.deleteUser);

app.use("/api/products", ProductRouter);
app.use("/api/cart", CartRouter);
app.use("/api/questions", QuestionRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
