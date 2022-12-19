import React from 'react';
import {Button, Modal, Form, Input, Upload} from "antd";
import {setModalConfirm, selectModalConfirm} from "../../app/slice";
import {useDispatch, useSelector} from "react-redux";
import {selectUserProfile} from "../../app/slice";

const Confirm = () => {
    const dispatch = useDispatch();
    const modalConfirm = useSelector(selectModalConfirm);
    const userProfile = useSelector(selectUserProfile);
    const {show, type} = modalConfirm;

    const handleCancel = () => {
        dispatch(setModalConfirm({show : false, type : ""}));
    };

    const modal = {
        "edit-profile" : {
            title : "프로필 편집",
            body : (
                <>

                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    >
                        <img
                            src={userProfile.photoURL}
                            alt="avatar"
                            style={{
                                width: '100%',
                                height: '100%'
                            }}
                        />
                    </Upload>
                    <Form name="nest-messages" style={{marginTop : '30px'}}>
                        <Form.Item
                            name={['user', 'name']}
                            label="Name"
                        >
                            <Input defaultValue={userProfile.name} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input defaultValue={userProfile.email} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'birth']}
                            label="Birth"
                        >
                            <Input defaultValue={userProfile.birth} />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'phone']}
                            label="Phone"
                        >
                            <Input defaultValue={userProfile.phone} />
                        </Form.Item>
                    </Form>
                </>
            ),
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
