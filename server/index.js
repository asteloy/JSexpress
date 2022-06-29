import express from "express";
import 'dotenv/config'
import sequelize from "./db.js";
import cors from "cors";
import fileUpload from "express-fileupload";
import models from "./models/model.js"
import router from "./routes/index.js"
import ErrorHandlingMiddleware from "./middleware/ErrorHandlingMiddleware.js";
import path from "path";


const PORT = process.env.PORT||5000;

const app = express();

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.resolve(__dirname,'static')));
app.use('/api',router);

app.use(ErrorHandlingMiddleware);

app.get('/api',(req,res)=>{
        res.status(200).json({message:"ALL WORKING"})
})

const start = async ()=>{
    try{
       await sequelize.authenticate();
       await sequelize.sync();
       app.listen(PORT,()=>console.log(`Server started on port ${5000}`));
    }catch(e){
        console.log(e);
    }
}
start();
