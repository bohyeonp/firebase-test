import React from 'react';
import {Form, Input, Button, Radio} from "antd";
import {useSelector} from "react-redux";
import {selectUserProfile} from "../../app/slice";
import {GiftOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import {checkBirth, checkName, checkPhoneNumber} from "../../utils/utilCommon";
import "../../assets/css/styles.css"
import {updateProfileApi} from "../../api/adaptor.api";

const EditProfile = () => {
    const userProfile = useSelector(selectUserProfile);

    const imageArray = ["0","1","2","3","4","5","6","7","8"]
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    };

    const validateName = (_, value) => {
        if (!value || checkName(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const validateBirth = (_, value) => {
        if (!value || checkBirth(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const validatePhone = (_, value) => {
        if (!value || checkPhoneNumber(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const onFinish = (values) => {
        updateProfileApi(values);
    };


    return (
        <>
            <Form
                {...layout}
                initialValues={{
                    user : {
                        name : userProfile.name,
                        email : userProfile.email,
                        birth : userProfile.birth,
                        phone : userProfile.phone,
                        photo : userProfile.photoNum
                    }
                }}
                onFinish={onFinish}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            validator: validateName,
                            message: '이름에 숫자, 특수문자는 사용할 수 없습니다.'
                        }
                    ]}
                >
                    <Input placeholder="이름을 입력해주세요." prefix={<UserOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'email',
                            message: '이메일 형식에 맞게 작성해주세요.'
                        }
                    ]}
                >
                    <Input placeholder="이메일을 입력해주세요." prefix={<MailOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
                </Form.Item>
                <Form.Item
                    name={['user', 'photo']}
                    label="Photo"
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                >
                    <Radio.Group className="radio-custom">
                        {
                            imageArray.map((item, index) => (
                                <Radio value={item} key={index} > <img src={require(`../../assets/images/photo_${index}.png`)} alt=""/> </Radio>
                            ))
                        }
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    name={['user', 'birth']}
                    label="Birth"
                    rules={[
                        {
                            validator: validateBirth,
                            message: '생년월일은 \'YYYYMMDD\' 형식으로 숫자만 입력해주세요.'
                        }
                    ]}
                >
                    <Input placeholder="생년월일을 입력해주세요." prefix={<GiftOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
                </Form.Item>
                <Form.Item
                    name={['user', 'phone']}
                    label="Phone"
                    rules={[
                        {
                            validator: validatePhone,
                            message: '숫자만 입력해주세요.'
                        }
                    ]}
                >
                    <Input placeholder="휴대폰 번호를 입력해주세요." prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
                </Form.Item>
                <Form.Item
                    name="submit"
                    wrapperCol={{
                        offset: 4,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Edit
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
};
export default EditProfile;
