import Router from 'express'
import orderConroller from '../controllers/orderConroller.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router =new Router()

router.post('/add',orderConroller.addOrder)
router.get('/',authMiddleware,orderConroller.getAllOrders)

export default router