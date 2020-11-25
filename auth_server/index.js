const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());

//routes
const authRoutes = require('./routes/userRoutes');


app.use('/api', authRoutes);

//mongodb connection
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => console.log('Mongodb connected'));


const port = process.env.PORT || 8080;
const host = process.env.HOSTNAME;
//server connection
app.listen(port, host, () => {
    console.log(`Server is running ${host}:${port}`);
});