import model from "../models/model.js"
import ApiError from "../error/ApiError.js"

const Category = model.Category;

class CategoryController {
    async create(req,res){
       const {name}=req.body
       const category = await Category.create({name})
       return res.json(category);
    }
    async getAll(req,res){
        const categorys = await Category.findAll()
        return res.json(categorys);;
    }

}
export default new CategoryController();