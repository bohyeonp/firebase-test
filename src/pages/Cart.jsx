import React, {useEffect} from "react";

const Cart = () => {
    useEffect(()=> {
        console.log("장바구니")
    },[]);

    return (
        <div style={{
            marginTop: '250px',
            textAlign:'center',
            fontSize: '40px'}}
        >
            CART
        </div>
    )
}
export default Cart;
