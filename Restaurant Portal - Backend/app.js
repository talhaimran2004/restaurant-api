require("dotenv").config()

const express = require("express");
const connectDB = require("./db/connect");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const items = require('./routes/items')
const auth = require('./routes/auth');
const order = require('./routes/orders');
const { verify } = require("./middlewares/verify");
const app = express()

app.use(cors())
app.use(cookieParser())

app.use(express.static(path.join(process.cwd(), 'public')))

app.use(express.urlencoded({ extended: false }))

app.use('/api/food', items)
app.use('/api/auth',  auth)
app.use('/api/order',  order)

const port = process.env.PORT || 8080

let start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running on - ${port}`))
    } catch (error) {
        console.log(error); 
    }
}
start()


