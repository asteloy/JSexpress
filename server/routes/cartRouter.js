import Router from 'express'
import cartController from '../controllers/cartController.js'
import authMiddleware from '../middleware/authMiddleware.js'
// ------- Добавил проверку на авторизацию для того, чтобы вытащить оттуда авторизованного юзера -------- //

const router =new Router()

// ------- CRUD корзины ------- //
router.get('/', authMiddleware,cartController.getCartUser)
router.post('/add',authMiddleware,cartController.addToCart)
router.post('/delete',authMiddleware,cartController.deleteAllProductCart)


export default router