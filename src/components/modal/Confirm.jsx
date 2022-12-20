import React from 'react';
import {Button, Modal} from "antd";
import {setModalConfirm, selectModalConfirm} from "../../app/slice";
import {useDispatch, useSelector} from "react-redux";
import EditProfile from "./EditProfile";

const Confirm = () => {
    const dispatch = useDispatch();
    const modalConfirm = useSelector(selectModalConfirm);
    const {show, type} = modalConfirm;

    const handleCancel = () => {
        dispatch(setModalConfirm({show : false, type : ""}));
    };

    const modal = {
        "edit-profile" : {
            title : "프로필 편집",
            body : (<EditProfile/>),
            closable : false,
            okEvent : () => {
                handleCancel();
            }
        },
    }
    return (
        <Modal
            title={modal[type]?.title}
            open={show}
            onCancel={handleCancel}
            closable={modal[type]?.closable}
            footer={[
                <Button key="submit" type="primary" onClick={modal[type]?.okEvent}>OK</Button>
            ]}
        >
            {modal[type]?.body}
        </Modal>
    )
};
export default Confirm;
