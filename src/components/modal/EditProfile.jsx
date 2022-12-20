import React from 'react';
import {Form, Input, Upload} from "antd";
import {useSelector} from "react-redux";
import {selectUserProfile} from "../../app/slice";

const EditProfile = () => {
    const userProfile = useSelector(selectUserProfile);

    return (
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
    )
};
export default EditProfile;
