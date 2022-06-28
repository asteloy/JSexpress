import React, {
    useState
} from 'react';
import InputField from './InputField';
const LogInForm = ({
    initialData,
    onSubmit,
    errorMessage
}) => {
    const [logInData, setLogInData] = useState(initialData);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState("Емейл не может быть пустым!");
    const [passwordError, setPasswordError] = useState("Пароль не может быть пустым!");

    const handleSubmit = e => {
        e.preventDefault();
        if (logInData.email === '' && logInData.password === '') {
            setEmailDirty(true)
            setPasswordDirty(true)
            return
        } else if (logInData.email === '') {
            setEmailDirty(true)
        } else if (logInData.password === '') {
            setPasswordDirty(true)
        } else {
            onSubmit(logInData);
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
    return (
        <form onSubmit={handleSubmit}>
            <InputField
                type="email"
                placeholder="Емейл"
                value={logInData.email}
                onBlur={e => blurHandler(e)}
                onChange={e => (setLogInData({ ...logInData, email: e.target.value }), checkInput(e))}
            />
            {(emailDirty && emailError) && <div class="text-danger">{emailError}</div>}
            <InputField
                type="password"
                placeholder="Пароль"
                value={logInData.password}
                onBlur={e => blurHandler(e)}
                onChange={e => (setLogInData({ ...logInData, password: e.target.value }), checkInput(e))}
            />
            {(passwordDirty && passwordError) && <div class="text-danger">{passwordError}</div>}
            {errorMessage}
            <button style={{ width: '20%' }} className="btn btn-success mt-2">Войти</button>
        </form>
    );
    /* beautify ignore:end */
};

export default LogInForm;