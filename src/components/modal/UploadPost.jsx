import React, {useState}from 'react';
import {Form, Input, Button, Radio, InputNumber} from "antd";
const { TextArea } = Input;

const UploadPost = () => {
    const [cat, setCat] = useState("animal");
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
        console.log(values)
    };

    const onChangePrice = (value) => {
        console.log('changed', value);
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
