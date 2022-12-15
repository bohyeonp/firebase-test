import React, {useEffect, useState} from "react";
import Default from "../../components/modal/Default";
import Confirm from '../../components/modal/Confirm'
import { Button, Form, Input, Radio, Collapse, Checkbox } from 'antd';
import {auth, firestore} from "../../firebase/Firebase"
import {checkPhoneNumber, checkPassword, checkBirth, checkName} from '../../utils/utilCommon';
import {createUserWithEmailAndPassword} from "firebase/auth";
const { Panel } = Collapse;


/* eslint-enable no-template-curly-in-string */

const Detail = () => {
    const [onModalDefault, setOnModalDefault] = useState({show : false, type : ""});
    const [onModalConfirm, setOnModalConfirm] = useState({show : false, type : ""});

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
        const user = firestore.collection("user");
        createUserWithEmailAndPassword(auth, values.user.email, values.user.password)
            .then((userCredential) => {
                const userInfo = userCredential.user;
                user.doc(userInfo.uid).set({
                    ...values.user,
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
                    default:
                        setOnModalDefault({show: true, type: "join-fail"})
                        break;
                }
            });
    };

    return (
        <Form
            {...layout}
            style={{maxWidth: '800px', margin: '0 auto', paddingTop: '40px'}}
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
                <Input placeholder="이름을 입력해주세요."/>
            </Form.Item>
            <Form.Item
                name={['user', 'email']}
                label="Email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                    },
                ]}
            >
                <Input placeholder="이메일을 입력해주세요."/>
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
                <Input
                    placeholder="비밀번호를 입력해주세요."
                    type="password"
                    autoComplete="on"
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
                <Input placeholder="생년월일을 입력해주세요."/>
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
                        message: '\'-\'빼고 숫자만 입력해주세요.'
                    }
                ]}
            >
                <Input placeholder="휴대폰 번호를 입력해주세요."/>
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
                    <Collapse accordion style={{width: '533px'}}>
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
                    ...layout.wrapperCol,
                    offset: 8,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Join
                </Button>
            </Form.Item>
            {onModalDefault.show && <Default onModalDefault={onModalDefault} setOnModalDefault={setOnModalDefault}/>}
            {onModalConfirm.show && <Confirm onModalConfirm={onModalConfirm} setOnModalConfirm={setOnModalConfirm}/>}
        </Form>
    )
}
export default Detail;
