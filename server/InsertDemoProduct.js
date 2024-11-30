const mongoose = require('mongoose');
const Product = require('./models/Product'); // Adjust the path as necessary

mongoose.connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const demoProducts = [
    {
        name: 'Wireless Mouse',
        price: 19.99,
        image: 'https://example.com/wireless_mouse.jpg'
    },
    {
        name: 'Mechanical Keyboard',
        price: 79.99,
        image: 'https://example.com/mechanical_keyboard.jpg'
    },
    {
        name: 'HD Monitor',
        price: 149.99,
        image: 'https://example.com/hd_monitor.jpg'
    },
    {
        name: 'Laptop Stand',
        price: 29.99,
        image: 'https://example.com/laptop_stand.jpg'
    },
    {
        name: 'USB-C Hub',
        price: 39.99,
        image: 'https://example.com/usb_c_hub.jpg'
    },
    {
        name: 'Noise Cancelling Headphones',
        price: 99.99,
        image: 'https://example.com/noise_cancelling_headphones.jpg'
    },
    {
        name: 'Portable SSD',
        price: 59.99,
        image: 'https://example.com/portable_ssd.jpg'
    },
    {
        name: 'Webcam',
        price: 49.99,
        image: 'https://example.com/webcam.jpg'
    }
];
module.exports = demoProducts

