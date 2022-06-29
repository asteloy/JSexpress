import Router from "express";
import categoryController from "../controllers/categoryController.js";
import checkRole from "../middleware/checkroleMiddleware.js";


const router = new Router();

router.post('/',checkRole('ADMIN'),categoryController.create)
router.get('/',categoryController.getAll)

export default router;