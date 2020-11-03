const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
//require('./models/userModel');

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./routes/userRoutes');
//const requireToken = require('./middleware/requireToken');

app.use('/api', authRoutes);

// app.get('/',requireToken,(req,res)=>{
//     res.send('Your email is' + res.user.email);
// })


mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
}).then(() => console.log('Mongodb connected'));

const port = process.env.PORT || 8080;

app.listen(port, process.env.HOSTNAME, () => {
    console.log(`Server is running ${process.env.HOSTNAME}:${port}`);
});