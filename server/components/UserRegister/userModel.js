const mongoose = require('mongoose');
const { z } = require('zod');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['customer', 'seller', 'admin'] },
});

const User = mongoose.model('User', userSchema);

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6), });

const registrationSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});
module.exports = { registrationSchema, User, userSchema, loginSchema };