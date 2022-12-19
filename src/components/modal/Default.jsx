import React from 'react';
import {Modal} from "antd";
import {setModalDefault, selectModalDefault} from "../../app/slice";
import {useDispatch, useSelector} from "react-redux";

const Default = () => {
    const dispatch = useDispatch();
    const modalDefault = useSelector(selectModalDefault);
    const {show, type} = modalDefault;

    console.log(modalDefault)
    const handleCancel = () => {
        dispatch(setModalDefault({show : false, type : ""}));
    };

    const modal = {
        "auth/user-not-found" : {
            description : "이메일을 확인해주세요."
        },
        "auth/wrong-password" : {
            description : "비밀번호를 확인해주세요."
        },
        "login-fail" : {
            description : "로그인을 실패했습니다."
        },
        "email-already-in-use" : {
            description : "이미 사용중인 이메일 입니다."
        },
        "weak-password" : {
            description : "비밀번호를 6자리 이상 필요합니다."
        },
        "join-fail" : {
            description : "회원가입을 실패했습니다."
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
