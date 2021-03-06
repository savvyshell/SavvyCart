import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import conn from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import pkg from 'cloudinary'

const cloudinary = pkg

import { notFoundRouteHandler, errorHandler } from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

dotenv.config()
await conn()
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API running')
    })
}
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFoundRouteHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 1501
app.listen(PORT, ()=>{console.log(`Server is running on ${process.env.NODE_ENV} with port ${PORT}`.yellow.bold)})
