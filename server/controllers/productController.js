import {
    v4 as uuidv4
} from 'uuid';
import {
    fileURLToPath
} from 'url'
import path from "path"
import model from "../models/model.js"
import ApiError from "../error/ApiError.js";


const Product = model.Product;

const __filename = fileURLToPath(
    import.meta.url)
const __dirname = path.dirname(__filename);

class ProductController {

    async create(req, res, next) {
        try {
            const {
                name,
                price,
                brandId,
                categoryId,
                quantity,
                description
            } = req.body
            // const {image}=req.files
            // let filename=uuidv4()+".jpg"
            // image.mv(path.resolve(__dirname,"..","static",filename))

            const product = await Product.create({
                name,
                price,
                brandId,
                categoryId,
                quantity,
                description
            })

            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {
            categoryId,
            limit,
            page
        } = req.query;
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let products;
        if (categoryId) {
            products = await Product.findAndCountAll({
                where: {
                    categoryId,
                    limit,
                    offset
                }
            });
        } else {
            products = await Product.findAndCountAll({
                limit,
                offset
            });
        }
        return res.json(products);
    }

    async getOne(req, res) {
        const {
            id
        } = req.params;
        const product = await Product.findOne({
            where: {
                id
            }
        }, )
        return res.json(product);
    }

}
export default new ProductController();