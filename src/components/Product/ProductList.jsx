import useFetch from "../../hook/useFetch";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import supplies from "./supplies.json"
function ProductList(props) {
    const { cookies, setCookie } = props.cookies;

    const { isLoading, serverError, apiData } = useFetch(
        "GET",
        "mock_ups/supplies.json",
        {}
    );

    const [data, setData] = useState([]);

    const [cart, setCart] = useState([]);

    function countProduct(productId) {
        const productInCart = cookies.cart.find(item => item.id === productId);
        if (productInCart) return productInCart.count;
    }

    function addToCart(product) {
        setCart([...cart, { ...product, quantity: 1 }]);
        const productIsCart = cookies.cart.some(item => item.id === product.id);

        if (productIsCart) {
            const cartItems = cookies.cart.map(item => item.id === product.id ? { ...item, count: ++item.count } : item);
            setCookie('cart', [...cartItems], { path: '/' });
        } else {
            setCookie('cart', [...cookies.cart, { ...product, count: 1 }], { path: '/' });
        }
    }

    function removeCart(product) {
        const cartItems = cookies.cart.map(item => item.id === product.id ? { ...item, count: --item.count } : item);
        const productInCart = cookies.cart.find(item => item.id === product.id);
        if (productInCart.count === 0) {
            return setCookie('cart', cookies.cart.filter(item => item.id !== productInCart.id), { path: '/' });
        }
        setCookie('cart', [...cartItems], { path: '/' });
    }

    useEffect(() => {
        if (!cookies.cart) setCookie('cart', [], { path: '/' });
    }, [])

    useEffect(() => {
        if (!isLoading && apiData) setData(apiData);
    }, [isLoading])

    if (isLoading && !apiData) {
        return <div>
            loading...
        </div>
    } else {
        return (
            <>
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
                        {
                            data.map(product => {
                                return <ProductCard
                                    key={product.id}
                                    product={product}
                                    addToCart={addToCart}
                                    removeCart={removeCart}
                                    countProduct={countProduct}
                                    cookies={cookies}
                                    setCookie={setCookie}
                                />
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default ProductList;