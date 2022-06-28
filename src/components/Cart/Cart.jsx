import React from "react";
import CartItem from "./CartItem";
import axios from "axios";


function Cart(props) {
    const {cookies, setCookie} = props.cookies;

    function removeCartItem(cartItem) {
        setCookie('cart', cookies.cart.filter(item => item.id !== cartItem.id), {path: '/'});
    }

    function handleItemQuality(quality, item) {
        let getCart = cookies.cart;
        getCart.map(arg => {
            if (arg.id === item.id) {
                arg.count = Number(quality);
            }
        })
        setCookie('cart', getCart, {path: '/'});
    }

    function getLengthCart() {
        if (!cookies.cart) return;
        return cookies.cart.reduce((acc, item) => acc + item.count, 0);
    }

    function getPriceCart() {
        if (!cookies.cart) return;
        return cookies.cart.reduce((acc, item) => acc + item.count * item.price, 0);
    }

    async function sendOrder() {
        if (!cookies.cart) return;
        const order = cookies.cart;
        const serverOrder = order.map(item => {
            return {id: item.id, quantity: item.count};
        })

        const data = await axios({
            method: "post",
            url: "http://localhost:5000/order/create",
            data: JSON.stringify(serverOrder),
            headers: {"Content-Type": "application/json"},
        })
            .then(res => {
                setCookie('cart', [], {path: '/'})
                setCookie('order', [res.data], {path: '/'})
            });
    }

    return <div className="row col-12">
        <div className="col col-md-6 row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
            {(cookies.cart && cookies.cart.length !== 0) ?
                cookies.cart.map(item => {
                    return <CartItem key={item.id} {...item} handleItemQuality={handleItemQuality}
                                     removeCartItem={removeCartItem}/>
                })
                :
                <h2 className="text-center">Корзина пустая :(</h2>
            }
        </div>

        <div className="col col-1"></div>


        <div className="m-3 p-0 col-md-4 card text-center" style={{height: '12rem'}}>
            <div className="card-header">
                <button style={{width: '60%'}} className="btn btn-success" onClick={() => sendOrder()}>Заказать</button>
            </div>
            <div className="card-body">
                <h5 className="card-title">Ваша корзина</h5>
                <p className="card-text">Количество товаров: {getLengthCart()}</p>
            </div>
            <div className="card-footer text-muted">
                <p className="card-text">Общая стоимость: {getPriceCart()} ₽</p>
            </div>
        </div>
    </div>
}

export default Cart;