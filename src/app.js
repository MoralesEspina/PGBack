import express from 'express'
import morgan from 'morgan'
import { createRols } from './libs/initialSetup'

import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import clientRoutes from './routes/clients.routes'

var cors = require('cors')
const app = express()
createRols();


app.use(morgan('dev'));
app.use(express.json());
app.use(cors())

app.get('/', (req,res)=>{
    res.json('Bienvenido');     
})

app.use('/api/products', productsRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/clients', clientRoutes)

export default app;