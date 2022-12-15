import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { LockOutlined, UserOutlined, GithubOutlined, GoogleOutlined, MailOutlined, UserAddOutlined, MessageOutlined, ReadOutlined} from '@ant-design/icons';
import { Button, Form, Input, Avatar} from 'antd';
import {auth} from "../firebase/Firebase"
import Default from "../components/modal/Default";
import { signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
    const [onModalDefault, setOnModalDefault] = useState({show : false, type : ""});
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
            console.log(error.message);
        }
    };

    return (
        <>
            <Form
                {...layout}
                style={{maxWidth: '800px', margin: '0 auto', paddingTop: '40px'}}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinishEP}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                        type="password"
                        autoComplete="on"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
                <div >
                    <Link to={"/join-detail"}><Avatar style={{marginRight : '15px'}} size="large" icon={<UserAddOutlined />}/></Link>
                    <Link to={"/join-simple"}><Avatar style={{marginRight : '15px'}} size="large" icon={<MailOutlined />}/></Link>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<GithubOutlined />}/>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<GoogleOutlined />}/>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<MessageOutlined />}/>
                    <Avatar size="large" icon={<ReadOutlined />}/>
                </div>
            </Form>
            {onModalDefault.show && <Default onModalDefault={onModalDefault} setOnModalDefault={setOnModalDefault}/>}
        </>
    )
}
export default Login;
