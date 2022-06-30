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
    image: '',
    quantity: '',
};



export default function CreateProduct(props) {
    const { cookies, setCookie } = props.cookies;
    const [productData, setproductData] = useState(initialData);
    const ref = useRef();

    console.log(productData);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(productData)
    }

    const onSelectImageHandler = (files) => {
        const file = files[0];
        const formData = new FormData(file);
        console.log(file);
        formData.append('file', file)
        console.log(formData);
        productData.image = formData;
    }

    async function onSubmit(productData) {
        console.log(productData);
        productData.id = 1;
        productData.quantity = 1;
        productData.price = 1;
        const data = await axios({
            method: "post",
            url: "http://localhost:5000/api/product",
            data: JSON.stringify(productData),
            headers: { "Content-Type": "application/json" },
        })
            .then(console.log("успех"))
            .catch(console.log("ne успех"));
    }

    return (
        /* beautify ignore:start */
        <form onSubmit={handleSubmit}>
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
                type="integer"
                placeholder="Цена"
                value={productData.price}
                onChange={e => (setproductData({ ...productData, price: e.target.value }))}
            />
            <InputField
                type="integer"
                placeholder="Количество на складе"
                value={productData.quantity}
                onChange={e => (setproductData({ ...productData, quantity: e.target.value }))}
            />
            <InputField
                type="file"
                placeholder="Количество на складе"
                onChange={(e) => onSelectImageHandler(e.target.files)}
            />
            <button style={{ width: '20%' }} className="btn btn-success mt-2">Добавить продукт</button>
        </form>
        /* beautify ignore:end */
    )
}
