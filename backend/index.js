const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require('./db');

// Connect to MongoDB before using routes
mongoDB().then(() => {
    app.use(express.json());

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    app.use('/api', require("./routes/CreateUser"));
    app.use('/api', require("./routes/DisplayData"));
    app.use('/api', require("./routes/OrderData"));

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
