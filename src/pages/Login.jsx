import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import { LockOutlined, UserOutlined, GithubOutlined, GoogleOutlined, MailOutlined, UserAddOutlined, MessageOutlined, ReadOutlined} from '@ant-design/icons';
import { Button, Form, Input, Avatar} from 'antd';
import {firestore, auth} from "../firebase/Firebase"
import Default from "../components/modal/Default";
import {setIsLoggedIn} from "../app/slice";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {useDispatch} from "react-redux";

const Login = () => {
    const dispatch = useDispatch();
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
        console.log("LOGIN PAGE")
    },[]);

    const onFinish = (values) => {
        const user = firestore.collection("user");
        user.get().then((doc) => {
            let success = false
            const document = []
            doc.forEach((doc)=>{
                document.push(doc.data())
            });
            console.log(document)
            for(let i=0; i < document.length; i++){
                if(document[i].id === values.id && document[i].password === values.password) {
                    console.log(document[i])
                    success = true
                    break;
                }
            }
            if(success) {
                dispatch(setIsLoggedIn(true));
            } else setOnModalDefault({show: true, type: "login-fail"})
        });
        console.log('Received values of form: ', values);
    };

    const onFinishEP = async (values) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    const register = async (values) => {
        try {
            await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            await updateProfile(auth.currentUser, {
                displayName: values.name,
                photoURL: "https://blog.kakaocdn.net/dn/c3vWTf/btqUuNfnDsf/VQMbJlQW4ywjeI8cUE91OK/img.jpg"
            });
        } catch (error) {
            console.error('이메일 가입시 에러 : ', error);
            switch(error.code){
                case "auth/email-already-in-use":
                    setOnModalDefault({show: true, type: "email-already-in-use"})
                    break;
                case "auth/weak-password":
                    setOnModalDefault({show: true, type: "weak-password"})
                    break;
            }
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
                onFinish={onFinish}
            >
                <Form.Item
                    name="id"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ID!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ID" />
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
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
                <div >
                    <Link to={"/join"}><Avatar style={{marginRight : '15px'}} size="large" icon={<UserAddOutlined />}/></Link>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<MailOutlined />}/>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<GithubOutlined />}/>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<GoogleOutlined />}/>
                    <Avatar style={{marginRight : '15px'}} size="large" icon={<MessageOutlined />}/>
                    <Avatar size="large" icon={<ReadOutlined />}/>
                </div>
            </Form>

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
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Email&PW Log in
                    </Button>
                </Form.Item>
            </Form>

            <Form
                {...layout}
                style={{maxWidth: '800px', margin: '0 auto', paddingTop: '40px'}}
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={register}
            >
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Name',
                        }
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                        {
                            type : "email"
                        }
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
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        CreateUser
                    </Button>
                </Form.Item>
            </Form>
            {onModalDefault.show && <Default onModalDefault={onModalDefault} setOnModalDefault={setOnModalDefault}/>}
        </>
    )
}
export default Login;
