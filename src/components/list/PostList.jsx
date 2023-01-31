import React, {useEffect} from 'react';
import {Button} from "antd";
import {PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {selectUserProfile, setModalDefault} from "../../app/slice";
import {useNavigate} from "react-router-dom";

const contentStyle = {
    height: '170px',
};

const uploadStyle = {
    display: 'inline-block',
    width: '22%',
    height: '100%',
    margin: '10px',
    overflow: 'hidden',
    backgroundColor : '#fefefe',
    borderRadius: '20px',
    textAlign: 'center',
    position : 'relative'
};

const imageStyle = {
    width:'100%',
    height:'100%',
    objectFit:'cover',
    overflow: 'hidden',
    borderRadius: '20px'
};

const adIconStyle = {
    width : '25px',
    height : '25px',
    position: 'absolute',
    margin: '10px'
};

const PostList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = useSelector(selectUserProfile);

    useEffect(()=> {
        console.log("포스트 리스트")
    },[]);

    const uploadPost = () => dispatch(setModalDefault({show: true, type: 'upload-post'}));

    return (
        <div style={{marginLeft : '5%'}}>
            {userProfile.list?.post.length === 0
                ? <div style={{textAlign:'center', fontSize: '15px', marginTop: '100px'}}>
                    <p>첫 포스트를 업로드해보세요.</p>
                    <div onClick={uploadPost}>
                        <Button icon={<UploadOutlined />}>UPLOAD</Button>
                    </div>
                </div>
                : (
                    <>
                        <div style={contentStyle}>
                            <div onClick={uploadPost} style={uploadStyle}  className={"upload_btn"}>
                                <PlusOutlined style={{marginTop: '20%'}}/>
                                <div style={{ marginTop: 8 }}>UPLOAD</div>
                            </div>
                            {userProfile.list?.post.map((item, index) => (
                                <div key={index} style={uploadStyle}>
                                    { item.cat === "ad"
                                        && <img
                                            src={require("../../assets/images/ad_icon.png")}
                                            style={adIconStyle}
                                            alt=""
                                        />}
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
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>

    )
};
export default PostList;
