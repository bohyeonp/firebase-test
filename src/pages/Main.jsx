import React, {useEffect, useState} from "react";

const Main = () => {
    useEffect(()=> {
        console.log("메인")
    },[]);

    return (
        <div style={{
            marginTop: '350px',
            textAlign:'center',
            fontSize: '40px'}}
        >
            MAIN
        </div>
    )
}
export default Main;
