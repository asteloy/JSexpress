import React from 'react';
// import axios from "axios";
import LogInForm from './LogInForm';
import { useState } from 'react';
import users from './users.json';

const logInData = {
    email: '',
    password: '',
};

function LogInAction(props) {
    const { cookies, setCookie } = props.cookies;
    const { activeUser, changeActiveUser } = props.setActiveUser;
    const [errorMessage, setErrorMessage] = useState(<></>)

    function onSubmit(logInData) {
        users.forEach(element => {
            if (element.email == logInData.email && element.password == logInData.password) {
                logInData.id = element.id;
                logInData.isOwner = element.isOwner;
                logInData.isWorker = element.isWorker;
                logInData.name = element.name;
                logInData.surName = element.surName;
                logInData.balanse = element.balanse;
                setCookie('authData', logInData, { path: '/' });
            } else { setErrorMessage(<div class="text-danger">Не верно введены данные!</div>) }
        });
        if (users !== undefined) changeActiveUser(users.role);
    }

    /* beautify ignore:start */
    const logInForm = <LogInForm initialData={logInData} onSubmit={onSubmit} errorMessage={(errorMessage)} />;
    return <div>
        {logInForm}
    </div>;
    /* beautify ignore:end */
}


export default LogInAction;