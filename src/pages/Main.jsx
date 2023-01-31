import React, {useEffect, useState} from "react";
import {getPostApi} from "../api/adaptor.api";
import {selectImageList} from "../app/slice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
    LikeOutlined,
    DislikeOutlined,
    HeartOutlined
} from '@ant-design/icons';


const contentWrapStyle = {
    height: '550px',
    overflow : 'auto',
    display : 'flex',
    flexWrap: 'wrap'
};

const contentStyle = {
    flex: '1 1 50%',
    width : '70%',
    height : '90%'
};

const imageStyle = {
    width : '70%',
    height : '80%',
    objectFit:'cover',
    borderRadius: '20px',
    margin : '20px',
};

const buttonStyle = {
    marginLeft : '5%',
    fontSize : '20px'
};

const Main = () => {
    const navigate = useNavigate();
    const imageList = useSelector(selectImageList);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        console.log("메인")
        getPostApi({}, (err, res) => {
            res && setLoading(true)
        })
    },[]);

    return (
        loading && <div style={{
            marginLeft : '12%',
            fontSize: '40px'}}
        >
            {
                imageList?.length === 0 ? "포스트를 공유해주세요" : (
                    <div style={contentWrapStyle}>
                        {imageList.map((item, index) => (
                            <div key={index} style={contentStyle}>
                                <img
                                    className={ item.cat === "ad" ? 'image_list' : ''}
                                    key={index}
                                    style={imageStyle}
                                    src={item.url}
                                    alt=""
                                    onClick={() => {
                                        item.cat === "ad" && navigate(`/detail/${item.id}`)
                                    }}
                                />
                                <div style={buttonStyle}>
                                    <LikeOutlined style={{ marginRight : '30px'}}/>
                                    <DislikeOutlined style={{ marginRight : '30px'}}/>
                                    <HeartOutlined />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}
export default Main;
