const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOOSE_URL, PORT } = require('./utilies/config');
const userRoute = require('./routes/user');
const app = express()
app.use(cors())
app.use(express.json());
app.use('/',userRoute)
mongoose.connect(MONGOOSE_URL)
    .then(() => {
     console.log('connecting mongodb')
    })
    .catch((e) => {
     console.log('connection error',e)
    })
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
 })