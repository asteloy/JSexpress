import React, { useRef } from 'react'
import { useState } from 'react';
import InputField from '../LogIn/InputField';
import axios from 'axios';
import { divide } from 'lodash';

const initialData = {
    id: '',
    name: '',
    description: '',
    price: '',
    quantity: ''
};



export default function CreateProduct(props) {
    const { cookies, setCookie } = props.cookies;
    const [productData, setproductData] = useState(initialData);
    const ref = useRef();

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(productData)
    }

    const onSelectImageHandler = (files) => {
        const file = files[0];
        const formData = new FormData(file);
        formData.append('file', file)
    }

    async function onSubmit(productData) {

        productData.id = Math.random;

        const data = await axios({
            method: "post",
            url: "http://localhost:5000/api/product",
            data: JSON.stringify(productData),
            headers: { "Content-Type": "application/json" },
        })
            .then(console.log("успех"))
            .catch(e => console.log(e));
    }

    return (
        /* beautify ignore:start */
        <form onSubmit={handleSubmit}>
            <InputField
                type="string"
                placeholder="Название"
                value={productData.name}
                onChange={e => (setproductData({ ...productData, name: e.target.value }))}
            />
            <InputField
                type="string"
                placeholder="Описание"
                value={productData.description}
                onChange={e => (setproductData({ ...productData, description: e.target.value }))}
            />
            <InputField
                type="number"
                placeholder="Цена"
                value={productData.price}
                onChange={e => (setproductData({ ...productData, price: e.target.value }))}
            />
            <InputField
                type="number"
                placeholder="Количество на складе"
                value={productData.quantity}
                onChange={e => (setproductData({ ...productData, quantity: e.target.value }))}
            />
            <InputField
                type="file"
                placeholder="Img"
                onChange={(e) => onSelectImageHandler(e.target.files)}
            />
            <button style={{ width: '20%' }} className="btn btn-success mt-2">Добавить продукт</button>
        </form>
        /* beautify ignore:end */
    )
}
