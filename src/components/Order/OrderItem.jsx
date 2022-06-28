import React from "react";

function OrderItem(props) {
    const cartItem = props.props

    return (
        <figure className="m-1">
            <img src={cartItem.image} height="150" width="150" alt=""></img>
            <figcaption className="text-center">{cartItem.name}</figcaption>
            <figcaption className="text-center">{cartItem.quantity} x</figcaption>
        </figure>
    )
}

export default OrderItem;