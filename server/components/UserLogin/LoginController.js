const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { loginSchema, User } = require('../UserRegister/userModel');

const LoginController = async (req, res) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        console.log(user)

        const token = jwt.sign({ id: user._id,name:user.username,email: user.email, role: user.role }, "your_jwt_secret", { expiresIn: "1h" });
        
        res.status(200).json({ message: "Login successful", token});
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = LoginController;
