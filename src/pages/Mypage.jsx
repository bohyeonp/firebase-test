import React, {useState, useEffect} from "react";
import {Tabs, Avatar, Button} from 'antd';
import TextList from "../components/list/TextList";
import {selectUserProfile} from "../app/slice";
import {useDispatch, useSelector} from "react-redux";
import {setModalDefault} from "../app/slice";

const Mypage = () => {
    const dispatch = useDispatch();
    const userProfile = useSelector(selectUserProfile);

    useEffect(()=> {
        console.log("마이")
    },[]);

    const editProfile = () => dispatch(setModalDefault({show: true, type: 'edit-profile'}));
    return (
        <>
            <div style={{display : 'flex'}}>
                <Avatar style={{margin : '20px'}} size={100} src={require(`../assets/images/photo_${userProfile.photoNum || "0" }.png`)}/>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <span>Name : {userProfile.name}</span>
                    <span>Email : {userProfile.email}</span>
                    <Button onClick={editProfile}>프로필 편집</Button>
                </div>
            </div>
            <Tabs
                size="large"
                centered={true}
                tabBarGutter={200}
                defaultActiveKey="1"
                items={[
                    {
                        label: `전체 포스트`,
                        key: '1',
                        children: '전체 포스트 노출'
                    },
                    {
                        label: `찜한 포스트`,
                        key: '2',
                        children: <TextList/>,
                    },
                    {
                        label: `구매 내역`,
                        key: '3',
                        children: <TextList showImg={true}/>,
                    },
                    {
                        label: `대시보드`,
                        key: '4',
                        children: `차트 노출`,
                    }
                ]}
            />
        </>
    )
}
export default Mypage;
