import ApiError from "../error/ApiError.js"
import bcrypt from "bcrypt"
import Jwt from "jsonwebtoken";
import model from "../models/model.js"

const User = model.User;
const Cart = model.User;

const generateJwt = (id,email,role)=>{
    return Jwt.sign(
        {id,email,role},
        process.env.SECRET_KEY,
        {expiresIn:'12h'}
        )
}

class UserController {
    async registration(req,res,next){
        const {email,password,role,name,surName} = req.body
        if(!email || !password){
            return next(ApiError.badRequest("Вы не ввели пароль или email"));
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким Email уже зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email,name,surName,role,password:hashPassword})
        const cart = await Cart.create({userId:user.id})
        const token  = generateJwt(user.id,user.email, user.role)
        return res.json({token});
    }
    async login(req,res,next){
        const {email,password} = req.body
        const user = await User.findOne({where:{email}})
        if (!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password,user.password)
        if (!comparePassword){
            return next(ApiError.internal('Указан не верный пароль'))
        }
        const token =generateJwt(user.id,user.email,user.role)
        return res.json({token})
    }
    async check(req,res,next){
        const token = generateJwt(user.id,user.email,user.role);
        return res.json({token})
    }

}
export default new UserController();