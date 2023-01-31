import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAdDetailApi} from "../api/adaptor.api";
import {comma} from "../utils/utilCommon";
import {Avatar, Button, InputNumber} from "antd";
import {LikeOutlined, ShoppingCartOutlined} from "@ant-design/icons";

const Detail = () => {
    const params = useParams();
    const id = params.id;
    const [adData, setAdData] = useState({});
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);

    useEffect(()=> {
        console.log("상품 상세")
        getAdDetailApi(id, (err, res) => {
            setAdData(res);
            setLoading(true)
        });
    },[]);

    const onChange = (value) => {
        setCount(value)
    };

    return (
        loading && <div style={{
            margin : '20px 50px 0px 50px',
            fontSize: '16px'}}
        >
            <div style={{height: '500px', overflow : 'auto'}}>
                <Avatar shape="square" style={{marginBottom : '10px'}} size={250} src={adData.url}/>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <span> {adData.ad?.title}</span>
                    <span> ₩{comma(adData.ad?.price)}</span>
                    <div style={{width : '300px', backgroundColor : 'white', display: 'flex', margin : '20px 0px 20px 0px'}}>
                        <InputNumber  style={{ margin : '10px 20px 10px 20px'}} min={1} max={adData.ad?.stock} defaultValue={1} onChange={onChange}/>
                        <span style={{ margin : '15px 20px 10px 20px'}}> ₩{comma(adData.ad?.price * count)}</span>
                        <Button shape="circle" icon={<ShoppingCartOutlined />} style={{ margin : '10px 20px 10px 20px', fontSize: '24px' }} />
                    </div>
                    <span dangerouslySetInnerHTML={{__html : adData.ad?.des}}/>
                </div>
            </div>
        </div>
    )
}
export default Detail;
