const bcrypt = require('bcrypt');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { registrationSchema, User } = require('./userModel');

const UserController = async (req, res) => {
    try {
        const validatedData = registrationSchema.parse(req.body);
        const { username, email, password } = validatedData;
        const { role } = req.params;

        if (!['customer', 'seller', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Invalid role' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token, role });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ errors: error.errors });
        }
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = UserController;
