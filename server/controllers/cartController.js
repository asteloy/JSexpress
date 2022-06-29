import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url'
import path from "path"
import model from "../models/model.js"
import ApiError from "../error/ApiError.js";


const CartProduct = model.CartProduct;



class CartController {

    async addToCart(req,res,next){

        const user = req.user
        const {productId} = req.body
        const cart = await CartProduct.create({cartId : user.id, productId : productId})
        return res.json({cart})
    }

    // async getBasketUser(req,res){
    //     const {id} = req.user
    //     const basket = await BasketDevice.findAll({include: {
    //             model: Device
    //         }, where: {basketId: id}})

    //     return res.json(basket)
    // }

}
export default  new CartController();