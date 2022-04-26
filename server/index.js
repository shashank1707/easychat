const express = require('express');
const cors =  require('cors');
const mongoose = require('mongoose');
const userRoutes =  require('./routes/auth');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth/', userRoutes);

const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB CONNECTED");
}).catch((err) => {
    console.log(err.message);
})

const server = app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
})