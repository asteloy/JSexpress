import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url'
import path from "path"
import model from "../models/model.js"
import ApiError from "../error/ApiError.js";


const Order = model.Order;
const User = model.User;
const Product = model.Product;
const OrderProduct = model.OrderProduct;


class OrderController {

    async addOrder(req,res,next){

       const order = req.body;
       for(let elem in order){
        let value = order[elem];

        for (let i = 0;i<value.products.length;i++)
        {
            const isProduct = await Product.findOne({where:{id:value.products[i].id}})
            if (isProduct.quantity>value.products[i].count){
                const updateProduct = await Product.update(
                    {quantity:isProduct.quantity-value.products[i].count},
                    {where:{id:value.products[i].id}})
            }
            else{
                return res.json({"message":"Товар закончился"})
            }
            
        }
        const orders = await Order.create(
            {
                total:value.total,
                price:value.price,
                status:value.status,
                userId:value.userId,
            })
        for (let i = 0;i<value.products.length;i++)
        {
            const ordersProduct = await OrderProduct.create(
                    {
                        count:value.products[i].count,
                        orderId:orders.id,
                        productId:value.products[i].id,
                    })
            
        }
        return res.json({"message":"Успех"})
       }
       
}
async getAllOrders(req,res,next){

    const user = req.user
    const orders = await Order.findAll({where:{userId:user.id}})

    return res.json({orders})
}
}

export default  new OrderController();