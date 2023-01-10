import React, {useEffect} from "react";
import {Button, Form, Input, Tabs} from 'antd';
import {checkPassword} from '../utils/utilCommon';
import {deleteUserApi, updatePasswordApi} from "../api/adaptor.api";
import {LockOutlined} from "@ant-design/icons";

const Setting = () => {
    const layout = {
        labelcol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(()=> {
        console.log("설정 화면")
    },[]);

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

    const change = async (values) => {
        updatePasswordApi(values.password)
    };

    const deleteApi = async () => {
        deleteUserApi()
    };

    return (
        <Tabs
            size="large"
            centered={true}
            tabBarGutter={200}
            defaultActiveKey="1"
            items={[
                {
                    label: `비밀번호 변경`,
                    key: '1',
                    children: <Form
                        {...layout}
                        style={{maxWidth: '600px', margin: '0 auto', paddingTop: '40px'}}
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={change}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={['password', 'current']}
                            label="Current PW"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    validator: validatePassword,
                                    message: "최소 10자리 영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합"
                                }
                            ]}
                        >
                            <Input.Password
                                placeholder="비밀번호를 입력해주세요"
                                type="password"
                                autoComplete="on"
                                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                            />
                        </Form.Item>
                        <Form.Item
                            name={['password', 'new']}
                            label="New PW"
                            rules={[
                                {
                                    required: true,
                                },
                                {
                                    validator: validatePassword,
                                    message: "최소 10자리 영문 대/소문자, 숫자, 특수문자 중 3가지 이상 조합"
                                }
                            ]}
                        >
                            <Input.Password
                                placeholder="비밀번호를 입력해주세요"
                                type="password"
                                autoComplete="on"
                                prefix={<LockOutlined style={{ color: 'rgba(0, 0, 0, 0.25)' }} />}
                            />
                        </Form.Item>
                        <Form.Item
                            name="submit"
                            wrapperCol={{
                                offset: 4,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Change PW
                            </Button>
                        </Form.Item>
                    </Form>
                },
                {
                    label: `회원 탈퇴`,
                    key: '2',
                    children: <div style={{maxWidth: '600px', margin: '0 auto', paddingTop: '40px'}}>
                        <p>그 동안 BOSO를 이용해주신 회원님께 진심으로 감사드립니다. <br/> 더욱 발전하는 BOSO가 되겠습니다. <br/> 아래 회원 탈퇴 버튼을 누리시면 탈퇴 신청이 정상적으로 완료됩니다.</p>
                        <Button type="primary" onClick={() => deleteApi()}>회원 탈퇴</Button>
                    </div>,
                }
            ]}
        />
    )
}
export default Setting;
