import React, { useState, useEffect } from 'react'
import axios from 'axios';
import InputField from '../LogIn/InputField';
import './modalpay.css';
import jwt_decode from "jwt-decode";

const payData = {
    token: '',
    balance: '',
};

export default function ModalPayment({ cookies, active, setActive }) {

    const [payemtData, setРаynemtData] = useState(payData);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(payemtData);
        setActive(false);
    }


    async function onSubmit(payemtData) {
        if (payemtData.balance !== '') {
            payemtData.token = cookies.cookies.authData.token;

            const users = await axios({
                method: "post",
                url: "http://localhost:5000/api/user/updateBalance",
                data: JSON.stringify(payemtData),
                headers: { "Content-Type": "application/json" },
            })
                .then(res => res.data)
                .catch(e => console.log(e));
            let token = users.token;
            let decoded = jwt_decode(token);
            let balance = decoded.balance;
            cookies.setCookie('authData', { token: token, balance: balance }, { path: '/' });
        }
    }
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <InputField
                        type="number"
                        placeholder="Сумма"
                        onChange={e => (setРаynemtData({ ...payemtData, balance: e.target.value }))}
                    />
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Пополнить счет</button>
                </form>
            </div>
        </div>
    )
}
