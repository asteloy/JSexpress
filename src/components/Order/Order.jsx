import React from "react";
import OrderItems from "./OrderItems";
import catalog from "./catalog.json"

function Order(props) {
    if (!props.cookies.order) {
        return <h2> Нет заказов :(</h2>;
    }
    //const oder = props.cookies.order;
    const oder = catalog;
    return <div>
        {oder.map(item => <OrderItems key={item.id} {...item} />)}
    </div>
}

export default Order;