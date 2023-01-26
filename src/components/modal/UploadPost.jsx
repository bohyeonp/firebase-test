import React, {useState}from 'react';
import {Form, Input, Button, Radio, InputNumber, Upload, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {uploadPostApi} from "../../api/adaptor.api";
const { TextArea } = Input;

const UploadPost = () => {
    const [cat, setCat] = useState("animal");
    const [imageUrl, setImageUrl] = useState("");

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };
    const validateMessages = {
        required: '${label} is required!',
    };

    const onChangeCat = (e) => {
        setCat(e.target.value);
    };

    const onFinish = (values) => {
        const ad = values.ad
        let postData = {
            url : values.post.url,
            cat : values.post.cat,
            id : Math.random().toString(36).substr(2, 16)
        }
       if(values.post.cat === "ad") postData = {...postData, ad}
       uploadPostApi(postData);
    };

    const onChangePrice = (value) => {
        console.log('changed', value);
    };

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
        getBase64(info.file.originFileObj, (url) => {
            setImageUrl(url);
        });
    };

    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    post : {
                        cat : "animal"
                    }
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['post', 'photo']}
                    label="Photo"
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {
                            imageUrl === ""
                                ? <div>
                                    <PlusOutlined style={{marginTop: '23%'}}/>
                                    <div style={{ marginTop: 8 }}>UPLOAD</div>
                                </div>
                                : <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                        }

                    </Upload>
                </Form.Item>
                <Form.Item
                    name={['post', 'url']}
                    label="PhotoURL"
                    rules={[{required: true}]}
                >
                    <Input style={{width : '300px'}} placeholder="이미지 URL을 입력해주세요."/>
                </Form.Item>
                <Form.Item
                    name={['post', 'cat']}
                    label="Category"
                    rules={[{required: true}]}
                >
                    <Radio.Group onChange={onChangeCat} value={cat}>
                        <Radio value={"animal"}>동물</Radio>
                        <Radio value={"person"}>인물</Radio>
                        <Radio value={"food"}>음식</Radio>
                        <Radio value={"view"}>풍경</Radio>
                        <Radio value={"ad"}>광고</Radio>
                    </Radio.Group>
                </Form.Item>
                {
                    cat === "ad" && (
                        <>
                            <Form.Item
                                name={['ad', 'title']}
                                label="title"
                                rules={[{required: true}]}
                            >
                                <Input style={{width : '300px'}} placeholder="상품명을 입력해주세요."/>
                            </Form.Item>
                            <Form.Item
                                name={['ad', 'price']}
                                label="price"
                                rules={[{required: true}]}
                            >
                                <InputNumber
                                    style={{width : '300px'}}
                                    formatter={(value) => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    onChange={onChangePrice}
                                    placeholder="상품 금액을 입력해주세요."
                                />
                            </Form.Item>
                            <Form.Item
                                name={['ad', 'des']}
                                label="description"
                                rules={[{required: true}]}
                            >
                                <TextArea style={{width : '300px'}} placeholder="상품 설명을 입력해주세요."/>
                            </Form.Item>
                        </>
                    )
                }
                <Form.Item
                    name="submit"
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Upload
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
};
export default UploadPost;
