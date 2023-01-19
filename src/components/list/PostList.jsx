import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, Upload, Button, message} from "antd";
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
    textAlign: 'center'
};

const imageStyle = {
    width:'100%',
    height:'100%',
    objectFit:'cover',
    overflow: 'hidden'
};

const PostList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userProfile = useSelector(selectUserProfile);
    useEffect(()=> {
        console.log("포스트 리스트")
    },[]);

    const [imageUrl, setImageUrl] = useState(userProfile.photoNum);

    useEffect(()=> {
        console.log("마이")
    },[]);

    const uploadPost = () => dispatch(setModalDefault({show: true, type: 'upload-post'}));

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
            // setLoading(false);
            console.log(url)
            setImageUrl(url);
        });
    };

    const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div style={{marginLeft : '5%'}}>
            {userProfile.list?.post.length === 0
                ? <div style={{textAlign:'center', fontSize: '15px', marginTop: '100px'}}>
                    <p>첫 포스트를 업로드해보세요.</p>
                    {/*<Upload*/}
                    {/*    name="avatar"*/}
                    {/*    listType="picture-card"*/}
                    {/*    className="avatar-uploader"*/}
                    {/*    showUploadList={false}*/}
                    {/*    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"*/}
                    {/*    beforeUpload={beforeUpload}*/}
                    {/*    onChange={handleChange}*/}
                    {/*>*/}
                    {/*    <div>업로드</div>*/}
                    {/*</Upload>*/}
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
