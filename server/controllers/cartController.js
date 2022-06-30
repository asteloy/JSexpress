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
        const isCartProduct = await CartProduct.findOne({where:{productId:productId,cartId:user.id}})
        if (isCartProduct){
            const cartProduct = await CartProduct.update({count:isCartProduct.count+1},{where:{
                cartId:user.id,productId:productId
            }})
            return res.json({isCartProduct})
        }else{
            const cartProduct = await CartProduct.create({cartId:user.id,productId})
            return res.json({cartProduct})
        }
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

        console.log(cart);

        return res.json(cart)
    }

    async deleteOneProductCart(req,res){

        const {productId} = req.body
        const {id} = req.user
        const cart = await CartProduct.destroy({where:{productId:productId}})

        const cartShow = await CartProduct.findAll({include: {
            model: Product
        }, where: {cartId: id}})
    return res.json(cartShow)
    }



}
export default  new CartController();