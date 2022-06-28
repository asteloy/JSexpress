import React from "react";
import OrderItems from "./OrderItems";
import OrderStream from "./OrderStream";


function Order(props) {
    if (!props.cookies.order) {
        return <h2> Нет заказов :(</h2>;
    }

    const oder = props.cookies.order;

    return <div>
        {oder.map(item => <OrderItems key={item.id} {...item}/>)}
    </div>
}

export default Order;