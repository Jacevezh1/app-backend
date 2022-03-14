// 1. IMPORTS
const express = require('express')
const app = express()

const cors = require('cors')
const connectDB = require('./config/db')

require('dotenv').config()


// 2. MIDDLEWARES
connectDB();

// 3. Habilitar CORS
app.use(cors())

// 4. Peticiones y Respuestas se manejan en JSON
app.use(express.json())

// 5. RUTAS
app.use("/posts", require('./routes/posts'))

 

// 6. SERVER
app.listen(process.env.PORT,() => {
    console.log(`Server working on port ${process.env.PORT}`);
})