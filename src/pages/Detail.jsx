import React, {useEffect} from "react";

const Detail = () => {
    useEffect(()=> {
        console.log("CART PAGE")
    },[]);

    return (
        <div style={{
            marginTop: '250px',
            textAlign:'center',
            fontSize: '40px'}}
        >
            DETAIL
        </div>
    )
}
export default Detail;
