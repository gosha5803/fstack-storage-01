require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const errorsMiddleware = require('./Middlewares/errorsMiddleware')
const PORT = process.env.PORT || 5555

app.use(cookieParser())
app.use(fileUpload({}))
app.use(cors({
    credentials: true, 
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use('/api', require('./routes/router'))
app.use(errorsMiddleware)

const start = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useUnifiedTopology:  true,
            useNewUrlParser: true
        })
        app.listen(PORT, () => {
            console.log(`Server's been started at ${PORT} port...`)
        })
    } catch (e) {
        console.error(e)
    }
}

start()