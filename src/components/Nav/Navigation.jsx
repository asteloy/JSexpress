import React, { useEffect, useState } from "react";
import './navStyles.css'

export default function Navigation(props) {
    const [lengthCart, setLengthCart] = useState(null);
    const { repage, page } = props;
    const { cookies, setCookie } = props.coocki;
    const logOut = props.logOut;

    function getLengthCart() {
        if (!cookies.cart) return 0;
        return cookies.cart.reduce((acc, item) => acc + item.count, 0);
    }

    useEffect(() => {
        setLengthCart(getLengthCart() || 0);
    }, [])

    useEffect(() => {
        setLengthCart(getLengthCart);
    }, [cookies.cart])
    console.log(cookies);
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src="/images/logo.png" alt="zozon" width="100" height="24"
                    className=" d-inline-block align-text-center bg-light" />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a data-page="Каталог" className={`nav-link ${page === 'Каталог' ? 'active' : ''}`}
                                aria-current="page" href="/"
                                onClick={repage}>Каталог</a>
                        </li>
                        <li className="nav-item">
                            <a data-page="Заказы" className={`nav-link ${page === 'Заказы' ? 'active' : ''}`}
                                href="/"
                                onClick={repage}>Мои заказы</a>
                        </li>
                        {cookies.authData.role === 'admin' ?
                            <li className="nav-item">
                                <a data-page="ДобавлениеКарточки" className={`nav-link ${page === 'ДобавлениеКарточки' ? 'active' : ''}`}
                                    href="/"
                                    onClick={repage}>Добавить карточку товара</a>
                            </li> : <></>
                        }
                    </ul>
                    <ul className="navbar-nav d-flex">
                        {(cookies.authData !== undefined && cookies.authData !== "undefined") ?
                            <li className="nav-item">
                                <a data-page="Выйти" href="/" className={`nav-link`} onClick={logOut}><i
                                    className="bi bi-door-open"></i> Выйти</a>
                            </li>
                            :
                            <><li className="nav-item">
                                <a data-page="Регистрация" href="/" className={`nav-link`} onClick={repage}><i
                                    className="bi bi-key"></i> Регистрация</a>
                            </li>
                                <li className="nav-item">
                                    <a data-page="Вход" href="/" className={`nav-link ${page === 'Вход' ? 'active' : ''}`} onClick={repage}><i
                                        className="bi bi-door-open"></i> Войти</a>
                                </li></>
                        }
                        <li className="nav-item d-f" onClick={repage} data-page="Корзина">
                            <div className="d-flex align-items-center">
                                <a
                                    className={`nav-link ${page === 'Корзина' ? 'active' : ''}`} href="/"
                                    onClick={repage} data-page="Корзина"
                                >
                                    <i onClick={repage} data-page="Корзина" className="bi bi-bag"></i> Корзина {lengthCart} </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            {(cookies.authData !== undefined && cookies.authData !== "undefined") ? <div className="container-fluid">
                <div className=" d-inline-block" ><p className="intro h5 text-info ">Привет, {cookies.authData.name} {cookies.authData.surName}</p></div>
                <div className="price">
                    <p className="balance d-inline-block font-weight-bold h5 text-info">Баланс: {cookies.authData.balance}</p>
                    <button style={{ width: '110px' }} className="btn btn-success">Пополнить</button>
                </div>
            </div> : <></>}
        </nav>
    )
}