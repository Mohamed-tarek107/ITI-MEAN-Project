const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config();
const PORT = process.env.PORT;

app.use(cors())
app.use(express.json())






app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.error(error);
    }
});
