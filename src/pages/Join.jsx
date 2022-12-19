import React from "react";
import {useParams} from 'react-router-dom'
import Detail from "../components/join/Detail";
import Simple from "../components/join/Simple";

const Join = () => {
    const params = useParams();
    const type = params.type;

    return (
        type === "detail" ? <Detail/> : type === "simple" ? <Simple/> : null
    )
}
export default Join;
