import React from 'react'
import { useState } from 'react';
import InputField from '../LogIn/InputField';

const initialData = {
    id: '',
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    quantity: '',
};

export default function CreateProduct(props) {
    const { cookies, setCookie } = props.cookies;
    const [productData, setproductData] = useState(initialData);

    function onSubmit(productData) {
        console.log(productData);
        productData.role = 'user'
        productData.id = Math.random();
        productData.balanse = 0;
        setCookie('authData', productData, { path: '/' });
    }


    return (
        /* beautify ignore:start */
        <form onSubmit={onSubmit}>
            <InputField
                type="name"
                placeholder="Название"
                value={productData.name}
                onChange={e => (setproductData({ ...productData, name: e.target.value }))}
            />
            <InputField
                type="description"
                placeholder="Описание"
                value={productData.description}
                onChange={e => (setproductData({ ...productData, description: e.target.value }))}
            />
            <InputField
                type="price"
                placeholder="Цена"
                value={productData.price}
                onChange={e => (setproductData({ ...productData, price: e.target.value }))}
            />
            <InputField
                type="category"
                placeholder="Категория"
                value={productData.category}
                onChange={e => (setproductData({ ...productData, category: e.target.value }))}
            />
            <InputField
                type="quantity"
                placeholder="Количество на складе"
                value={productData.quantity}
                onChange={e => (setproductData({ ...productData, quantity: e.target.value }))}
            />
            <button style={{ width: '20%' }} className="btn btn-success mt-2">Добавить продукт</button>
        </form>
        /* beautify ignore:end */
    )
}
