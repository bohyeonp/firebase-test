import React, {useEffect, useState} from "react";
import Default from '../../components/modal/Default'
import { Button, Form, Input } from 'antd';
import {auth, firestore} from "../../firebase/Firebase"
import {checkPassword, checkName} from '../../utils/utilCommon';
import {createUserWithEmailAndPassword} from "firebase/auth";

/* eslint-enable no-template-curly-in-string */

const Simple = () => {
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
        console.log("가입 간편")
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

    const validateName = (_, value) => {
        if (!value || checkName(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject(new Error(_.message));
        }
    }

    const register = async (values) => {
        const user = firestore.collection("user");
        createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                const userInfo = userCredential.user;
                user.doc(userInfo.uid).set({
                    email : values.email,
                    name : values.name,
                    photoURL : "https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_1280.png"
                });
            })
            .catch((error) => {
                console.error('이메일 가입시 에러 : ', error);
                switch(error.code){
                    case "auth/email-already-in-use":
                        setOnModalDefault({show: true, type: "email-already-in-use"})
                        break;
                    case "auth/weak-password":
                        setOnModalDefault({show: true, type: "weak-password"})
                        break;
                }
            });
    };

    return (
        <Form
            {...layout}
            style={{maxWidth: '800px', margin: '0 auto', paddingTop: '40px'}}
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={register}
            validateMessages={validateMessages}
        >
            <Form.Item
                name="name"
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
                <Input placeholder="이름을 입력해주세요." />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[
                    {
                        type : "email",
                        required: true,
                    }
                ]}
            >
                <Input placeholder="이메일을 입력해주세요" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
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
                <Input
                    placeholder="비밀번호를 입력해주세요"
                    type="password"
                    autoComplete="on"
                />
            </Form.Item>
            <Form.Item
                name="submit"
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    CreateUser
                </Button>
            </Form.Item>
            {onModalDefault.show && <Default onModalDefault={onModalDefault} setOnModalDefault={setOnModalDefault}/>}
        </Form>
    )
}
export default Simple;
