import Router from "express";
import productRouter from "./productRouter.js"
import userRouter from "./userRouter.js"
import categoryRouter from "./categoryRouter.js"

const router = new Router();

router.use('/user',userRouter)
router.use('/category',categoryRouter)
router.use('/product',productRouter)

export default router;