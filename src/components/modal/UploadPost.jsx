import React, {useState}from 'react';
import {Form, Input, Button, Radio, InputNumber, Upload, message} from "antd";
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

    const onChange = (e) => {
        setImageUrl(e.target.value)
    }

    /* 현재 미사용 */
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
    const  normFile = ( e: any ) => {
        console . log ( 'Upload event:' , e);
        if ( Array . isArray (e)) {
            return e;
        }
        return e && e.fileList ;
    };
    /* 현재 미사용 */

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
                    label="Photo Preview"
                    valuePropName = "fileList"
                    getValueFromEvent = {normFile}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                        disabled={true}
                    >
                        {
                            imageUrl === ""
                                ? <div>
                                    <img src={"https://www.dummyimage.com/305x305/f7f7f7/aba8ab.png&text=+Preview"}
                                         alt="preview"
                                         style={{
                                             width: '100%',
                                             height: '100%',
                                         }}
                                    />
                                </div>
                                : <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    onError={(e)=> {
                                        e.target.src = "https://www.dummyimage.com/305x305/f7f7f7/aba8ab.png&text=+Preview"
                                    }}
                                />
                        }

                    </Upload>
                </Form.Item>
                <Form.Item
                    name={['post', 'url']}
                    label="PhotoURL"
                    rules={[{required: true}]}
                    onChange={onChange}
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
                                label="Title"
                                rules={[{required: true}]}
                            >
                                <Input style={{width : '300px'}} placeholder="상품명을 입력해주세요."/>
                            </Form.Item>
                            <Form.Item
                                name={['ad', 'price']}
                                label="Price"
                                rules={[{required: true}]}
                            >
                                <InputNumber
                                    style={{width : '300px'}}
                                    formatter={(value) => `₩ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    onChange={onChangePrice}
                                    placeholder="상품 금액을 입력해주세요."
                                    min={1}
                                />
                            </Form.Item>
                            <Form.Item
                                name={['ad', 'stock']}
                                label="Stock"
                                rules={[{required: true}]}
                            >
                                <InputNumber min={1}  style={{width : '300px'}} placeholder="상품 재고를 입력해주세요."/>
                            </Form.Item>
                            <Form.Item
                                name={['ad', 'des']}
                                label="Description"
                                rules={[{required: true}]}
                            >
                                <TextArea style={{width : '300px', height : '120px'}} placeholder="상품 설명을 입력해주세요."/>
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
