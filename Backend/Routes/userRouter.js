import express from 'express'
import useContr from '../Controllers/userContrl.js'
import auth from '../Middlewares/auth.js'
const router = express.Router()

router.post('/register',useContr.register)
router.post('/login',useContr.login)
router.get('/info',auth, useContr.getUser)

export default router