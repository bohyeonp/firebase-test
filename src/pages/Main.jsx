import React, {useEffect, useState} from "react";
import {getPost} from "../api/adaptor.api";
import {selectImageList} from "../app/slice";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const contentStyle = {
    height: '550px',
    overflow : 'auto'

};

const imageStyle = {
    width:'20%',
    height:'45%',
    objectFit:'cover',
    margin : '20px',
    borderRadius: '20px'
};

const Main = () => {
    const navigate = useNavigate();
    const imageList = useSelector(selectImageList);
    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        console.log("메인")
        getPost({}, (err, res) => {
            res && setLoading(true)
        })
    },[]);

    return (
        loading && <div style={{
            marginLeft : "8%",
            fontSize: '40px'}}
        >
            {
                imageList?.length === 0 ? "포스트를 공유해주세요" : (
                    <div  style={contentStyle}>
                        {imageList.map((item, index) => (
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
                        ))}
                    </div>
                )
            }
        </div>
    )
}
export default Main;
