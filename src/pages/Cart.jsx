import React, {useEffect} from "react";

const Cart = () => {
    useEffect(()=> {
        console.log("CART PAGE")
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
