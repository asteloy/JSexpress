// import Router from 'express'
// // import cartController from '../controllers/cartController.js'
// import authMiddleware from '../middleware/authMiddleware.js'

// const router =new Router()

// router.get('/', authMiddleware,cartController.getCartUser)
// router.post('/add',authMiddleware,cartController.addToCart)
// router.post('/delete',authMiddleware,cartController.deleteAllProductCart)
// router.post('/deleteOne',authMiddleware,cartController.deleteOneProductCart)


// export default router

//ЭТО ПЕРВАЯ КОНЦЕПЦИЯ ВЗАИМОДЕЙТВИЯ С КАРЗИНОЙ, ПРЕДПОЛАГАЛОСЬ ЧТО ПОЛЬЗОВАТЕЛЬ БУДЕТ ЗАНОСИТЬ СРАЗУ ТОВАР В БД ПОСЛЕ ТОГО, КАК
//НАЖМЕТ "ДОБАВИТЬ В КОРЗИНУ " ну и все CRUD операции. НО Мы ОСТАНОВИЛИСЬ ЧТО ВСЕ ЗАИМОДЕЙСТВИЯ С КОРЗИНОЙ БУДУТ ЧЕРЕЗ ФРОНТ