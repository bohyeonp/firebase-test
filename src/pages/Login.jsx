import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { LockOutlined, UserOutlined, GithubOutlined, GoogleOutlined, UserAddOutlined, MessageOutlined, ReadOutlined, MailOutlined} from '@ant-design/icons';
import { Button, Form, Input} from 'antd';
import {auth} from "../firebase/Firebase"
import {setModalDefault} from "../app/slice";
import { signInWithEmailAndPassword} from "firebase/auth";
import {useDispatch} from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const layout = {
        labelCol: {
            span: 4,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(()=> {
        console.log("로그인")
    },[]);

    const onFinishEP = async (values) => {
        try {
            await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
        } catch (error) {
            switch(error.code){
                case "auth/user-not-found":
                    dispatch(setModalDefault({show: true, type: "auth/user-not-found"}));
                    break;
                case "auth/wrong-password":
                    dispatch(setModalDefault({show: true, type: "auth/wrong-password"}));
                    break;
                default:
                    dispatch(setModalDefault({show: true, type: "login-fail"}));
                    break;
            }
        }
    };

    return (
        <>
            <div>
                <Form
                    {...layout}
                    style={{maxWidth: '600px', margin: '0 auto', paddingTop: '40px'}}
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinishEP}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Email!',
                            },
                        ]}
                    >
                        <Input placeholder="이메일을 입력해주세요." prefix={<UserOutlined className="site-form-item-icon" style={{ color: 'rgba(0, 0, 0, 0.25)' }}/>}/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" style={{ color: 'rgba(0, 0, 0, 0.25)' }}/>}
                            placeholder="비밀번호를 입력해주세요."
                            type="password"
                            autoComplete="on"
                        />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className='login-icons' style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    size="large"
                    shape="circle"
                    icon={<UserAddOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                    onClick={() => navigate('/join/detail')}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<MailOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                    onClick={() => navigate('/join/simple')}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<GithubOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<GoogleOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<MessageOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
                <Button
                    style={{ marginLeft: '10px' }}
                    size="large"
                    shape="circle"
                    icon={<ReadOutlined  style={{ color: '#1890ff', fontSize: '24px' }} />}
                />
            </div>
        </>
    )
}
export default Login;
