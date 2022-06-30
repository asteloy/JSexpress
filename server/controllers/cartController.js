import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url'
import path from "path"
import model from "../models/model.js"
import ApiError from "../error/ApiError.js";


const CartProduct = model.CartProduct;
const Product = model.Product;



class CartController {

    async addToCart(req,res,next){

        const user = req.user
        console.log(user);
        const {productId} = req.body
        const cartProduct = await CartProduct.create({cartId:user.id,productId})
        return res.json({cartProduct})
    }

    async getCartUser(req,res){
        const {id} = req.user
        const cart = await CartProduct.findAll({include: {
                model: Product
            }, where: {cartId: id}})

        return res.json(cart)
    }

    async deleteAllProductCart(req,res){
        const {id} = req.user
        const cart = await CartProduct.destroy({where:{cartId:id}})

        return res.json(cart)
    }



}
export default  new CartController();