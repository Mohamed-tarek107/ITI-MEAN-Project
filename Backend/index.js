const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const watchlistroutes = require("./routes/watchlist")
require('dotenv').config();
const PORT = process.env.PORT;

const app = express()
app.use(cors())
app.use(express.json())


mongoose.connect(`mongodb+srv://Tareks:${process.env.Mongopass}@cluster0.w0k6ff5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/watchlist", watchlistroutes);


app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.error(error);
    }
});
