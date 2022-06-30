import React, { useState, useEffect } from 'react'
import axios from 'axios';
import InputField from '../LogIn/InputField';
import './modalpay.css';
import jwt_decode from "jwt-decode";

const payData = {
    balance: '',
};

export default function ModalPayment({ cookies, active, setActive }) {
    const [paymetData, setРаynemtData] = useState(payData);

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(paymetData);
        setActive(false);
    }


    async function onSubmit(paymetData) {
        if (paymetData.balance !== '') {
            const tokenAuth = cookies.cookies.authData.token;
            const users = await axios({
                method: "post",
                url: "http://localhost:5000/api/user/updateBalance",
                data: JSON.stringify(paymetData),
                headers: { 'Authorization': `Bearer ${tokenAuth}`, "Content-Type": "application/json" },
            })
                .then(res => res.data)
                .catch(e => console.log(e));
            let token = users.token;
            let decoded = jwt_decode(token);
            let role = decoded.role;
            let name = decoded.name;
            let surName = decoded.surName;
            let balance = decoded.balance;

            cookies.setCookie('authData', { token: token, role: role, name: name, surName: surName, balance: balance }, { path: '/' });
        }
    }
    return (
        <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content"} onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <label style={{ display: 'block' }}>
                        <div className="input-group mt-2">
                            <input
                                type="number"
                                onChange={e => (setРаynemtData({ ...paymetData, balance: e.target.value }))}
                                style={{ flex: 0.5 }}
                            />
                        </div>
                    </label>
                    <button type="button" className="btn btn-primary btn__modal" onClick={handleSubmit}>Пополнить счет</button>
                </form>
            </div>
        </div>
    )
}
