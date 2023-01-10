import React, {useEffect} from "react";
import { Button, Form, Input, Radio, Collapse, Checkbox } from 'antd';
import {createUserWithEmailAndPasswordApi} from "../../api/adaptor.api";
import {checkPhoneNumber, checkPassword, checkBirth, checkName} from '../../utils/utilCommon';
import {LockOutlined, MailOutlined, UserOutlined, PhoneOutlined, GiftOutlined} from "@ant-design/icons";
const { Panel } = Collapse;

const Detail = () => {
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(()=> {
        console.log("가입 상세")
    },[]);

    const genExtra = (key) => {
        return (
            <Checkbox value={key} onClick={(event) => event.stopPropagation()}/>
        );
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    };

    const validatePassword = (_, value) => {
        if (!value || checkPassword(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

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
        createUserWithEmailAndPasswordApi(values)
    };

    return (
        <Form
            {...layout}
            style={{maxWidth: '600px', margin: '0 auto', paddingTop: '40px'}}
            name="nest-messages"
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
                name={['user', 'password']}
                label="Password"
                rules={[
                    {
                        required: true
                    },
                    {
                        validator: validatePassword,
                        message: "최소 10자리 영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합"
                    }
                ]}
            >
                <Input.Password
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    autoComplete="on"
                    prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                />
            </Form.Item>
            <Form.Item
                name={['user', 'birth']}
                label="Birth"
                rules={[
                    {
                        required: true,
                    },
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
                        required: true,
                    },
                    {
                        validator: validatePhone,
                        message: '숫자만 입력해주세요.'
                    }
                ]}
            >
                <Input placeholder="휴대폰 번호를 입력해주세요." prefix={<PhoneOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}/>
            </Form.Item>
            <Form.Item
                name={['user', 'agree']}
                label="Agree"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Checkbox.Group>
                    <Collapse accordion style={{width: '400px'}}>
                        <Panel showArrow={false} header="(필수) 개인회원 약관 동의" key="1" extra={genExtra("A")}>
                            <p>개인회원 약관 동의 상세</p>
                        </Panel>
                    </Collapse>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                name={['user', 'expired']}
                label="Expired"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Radio.Group>
                    <Radio value="1">1년</Radio>
                    <Radio value="3">3년</Radio>
                    <Radio value="5">5년</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                name="submit"
                wrapperCol={{
                    offset: 4,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Join
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Detail;
