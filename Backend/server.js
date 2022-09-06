import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import db from './Config/Database.js'
// import userModel from './Models/userModel.js'
import userRouter from './Routes/userRouter.js'

dotenv.config()
const app = express()

try { 
    await db.authenticate()
    console.log('Database Connected')
    // await userModel.sync()
} catch (error) {
    console.log(error)
}

app.use(cors())
app.use(express.json())

app.use('/',userRouter) 

app.listen(5000,()=>{
    console.log('Server is running at port','http://localhost:'+5000)
})