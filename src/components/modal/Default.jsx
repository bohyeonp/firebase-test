import React from 'react';
import {Modal} from "antd";

const Default = ({ onModalDefault , setOnModalDefault }) => {
    const {show, type} = onModalDefault

    console.log(type)
    const handleCancel = () => {
        setOnModalDefault({show : false, type : ""});
    };
    const modal = {
        "id-not-available" : {
            description : "중복된 아이디입니다."
        },
        "id-available" : {
            description : "사용 가능한 아이디입니다."
        },
        "join-fail" : {
            description : "아이디 중복 체크가 필요합니다."
        },
        "login-fail" : {
            description : "아이디 또는 비밀번호를 확인해주세요."
        },
        "email-already-in-use" : {
            description : "이미 사용중인 이메일 입니다."
        },
        "weak-password" : {
            description : "비밀번호를 6자리 이상 필요합니다."
        },
    }
    return (
        <Modal
            title="알림"
            open={show}
            footer={null}
            onCancel={handleCancel}
        >
            <p>{modal[type]?.description}</p>
        </Modal>
    )
};
export default Default;
