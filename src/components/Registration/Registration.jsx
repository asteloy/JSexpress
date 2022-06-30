import React from 'react';
import { useState } from 'react';
import InputField from '../LogIn/InputField';
import axios from 'axios';

const initialData = {
    id: '',
    email: '',
    password: '',
    role: '',
    name: '',
    surName: '',
    balanse: '',
};

function Registration(props) {
    const { cookies, setCookie } = props.cookies;
    const { activeUser, changeActiveUser } = props.setActiveUser;
    const [regData, setRegData] = useState(initialData);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Емейл не может быть пустым!");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым!");

    async function onSubmit(regData) {
        console.log(regData);
        regData.id = 1;

        const data = await axios({
            method: "post",
            url: "http://localhost:5000/api/user/registration",
            data: JSON.stringify(regData),
            headers: { "Content-Type": "application/json" },
        })
            .then(res => {
                setCookie('authData', res.data, { path: '/' });
            })
            .catch(console.log("404"));
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (regData.email === '' && regData.password === '') {
            setEmailDirty(true)
            setPasswordDirty(true)
            return
        } else if (regData.email === '') {
            setEmailDirty(true)
        } else if (regData.password === '') {
            setPasswordDirty(true)
        } else {
            onSubmit(regData);
        }
    };

    function checkInput(e) {
        if (e.target.value !== '' && e.target.type === 'email') {
            setEmailDirty(false)
        } else if (e.target.value !== '' && e.target.type === 'password') {
            setPasswordDirty(false)
        }
    };
    const blurHandler = (e) => {
        if (e.target.value === '') {
            switch (e.target.type) {
                case 'email':
                    setEmailDirty(true)
                    break
                case 'password':
                    setPasswordDirty(true)
                    break
                default:
                    break
            }
        } else {
            switch (e.target.type) {
                case 'email':
                    setEmailDirty(false)
                    break
                case 'password':
                    setPasswordDirty(false)
                    break
                default:
                    break
            }
        }
    }



    /* beautify ignore:start */
    return <form onSubmit={handleSubmit}>
        <InputField
            type="email"
            placeholder="Емейл"
            value={regData.email}
            onBlur={e => blurHandler(e)}
            onChange={e => (setRegData({ ...regData, email: e.target.value }), checkInput(e))}
        />
        {(emailDirty && emailError) && <div className="text-danger">{emailError}</div>}
        <InputField
            type="password"
            placeholder="Пароль"
            value={regData.password}
            onBlur={e => blurHandler(e)}
            onChange={e => (setRegData({ ...regData, password: e.target.value }), checkInput(e))}
        />
        <InputField
            type="name"
            placeholder="Имя"
            value={regData.name}
            onBlur={e => blurHandler(e)}
            onChange={e => (setRegData({ ...regData, name: e.target.value }), checkInput(e))}
        />
        <InputField
            type="surname"
            placeholder="Фамилия"
            value={regData.surName}
            onBlur={e => blurHandler(e)}
            onChange={e => (setRegData({ ...regData, surName: e.target.value }), checkInput(e))}
        />
        <button style={{ width: '20%' }} className="btn btn-success mt-2">Регистрация</button>
    </form>;
    /* beautify ignore:end */
}


export default Registration;