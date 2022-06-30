import React from 'react';
import axios from "axios";
import LogInForm from './LogInForm';
import { useState } from 'react';
import jwt_decode from "jwt-decode";

const logInData = {
    email: '',
    password: '',
};

function LogInAction(props) {
    const { cookies, setCookie } = props.cookies;
    const { activeUser, changeActiveUser } = props.setActiveUser;
    const [errorMessage, setErrorMessage] = useState(<></>)

    async function onSubmit(logInData) {
        const users = await axios({
            method: "post",
            url: "http://localhost:5000/api/user/login",
            data: JSON.stringify(logInData),
            headers: { "Content-Type": "application/json" },
        })
            .then(res => res.data)
            .catch(() => setErrorMessage(<div class="text-danger">Не верно введены данные!</div>))
        let token = users.token;

        let decoded = jwt_decode(token);
        if (decoded !== undefined) changeActiveUser(decoded.role);
        let role = decoded.role
        let name = decoded.name
        let surName = decoded.surName
        let balance = decoded.balance
        console.log(decoded);
        setCookie('authData', { token: token, role: role, name: name, surName: surName, balance: balance }, { path: '/' });
    }

    /* beautify ignore:start */
    const logInForm = <LogInForm initialData={logInData} onSubmit={onSubmit} errorMessage={(errorMessage)} />;
    return <div>
        {logInForm}
    </div>;
    /* beautify ignore:end */
}


export default LogInAction;