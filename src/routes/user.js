import express from 'express'
import { getAllUser } from '../controllers/user.js'
import { Protect } from '../middlewares/auth.js'

const router = express.Router()

router.get('/getAll',Protect,getAllUser)

export default router