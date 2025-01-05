const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registrationSchema, User } = require("./userModel");

const UserController = {
    // Register a new user
    registerUser: async (req, res) => {
        try {
            const validatedData = registrationSchema.parse(req.body);
            const { username, email, password, role } = validatedData;

            if (!["customer", "seller", "admin"].includes(role)) {
                return res.status(400).json({ error: "Invalid role" });
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role,
            });
            await newUser.save();

            const token = jwt.sign(
                {
                    id: newUser._id,
                    name: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
                "your_jwt_secret",
                { expiresIn: "1h" }
            );

            res.status(201).json({ message: "User registered successfully", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    // User login
    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                },
                "your_jwt_secret",
                { expiresIn: "1h" }
            );

            res.status(200).json({ message: "Login successful", token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Server error" });
        }
    },

    // Get all users with pagination and optional search
    getAllUsers: async (req, res) => {
        try {
            const { page = 1, limit = 10, searchEmail = "" } = req.query;

            const query = searchEmail
                ? { email: { $regex: searchEmail, $options: "i" } } // Case-insensitive search
                : {};

            const users = await User.find(query)
                .select("-password") // Exclude passwords
                .skip((page - 1) * limit) // Skip records for pagination
                .limit(parseInt(limit)); // Limit the number of records

            const totalUsers = await User.countDocuments(query); // Get total count for pagination

            res.status(200).json({
                users,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: parseInt(page),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching users" });
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        const { id } = req.params;
        const { username, email, role } = req.body;

        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.username = username || user.username;
            user.email = email || user.email;
            user.role = role || user.role;

            await user.save();
            res.status(200).json({ message: "User updated successfully", user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating user" });
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findByIdAndDelete(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json({ message: "User deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error deleting user" });
        }
    },

    // Get a specific user by ID
    getUserById: async (req, res) => {
        const { id } = req.params;

        try {
            const user = await User.findById(id).select("-password");
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(200).json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error fetching user" });
        }
    },
};

module.exports = UserController;
