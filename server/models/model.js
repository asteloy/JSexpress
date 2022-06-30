import sequelize from "../db.js";

import {
    DataTypes
} from "sequelize";

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    surName: {
        type: DataTypes.STRING
    },
    balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER"
    },
})

const OrderProduct = sequelize.define('orderProduct',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    count:{type: DataTypes.INTEGER,defaultValue:1},
})
const Order = sequelize.define('order',{
    id:{type: DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    total:{type: DataTypes.INTEGER,defaultValue:1},
    price:{type: DataTypes.INTEGER,defaultValue:0},
    status:{type: DataTypes.STRING,defaultValue:"В обработке"},
})

const Product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
})

User.hasOne(Order);
Order.belongsTo(User);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Category.hasMany(Product);
Product.belongsTo(Category);


Product.belongsToMany(Order, {
    through: "orderProduct",
    as: "orders",
    foreignKey: "product_id",
  });


Order.belongsToMany(Product, {
    through: "orderProduct",
    as: "products",
    foreignKey: "order_id",
  });

export default {
    User,Category,Product,Order,OrderProduct
}

