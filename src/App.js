import React , {useEffect, useState}from 'react';
import {Routes, Route, useLocation, Navigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {RouteList, AuthRouteList} from "./app/router";
import 'antd/dist/antd.css';
import './index.css';
import FooterC from "./components/common/Footer";
import HeaderC from "./components/common/Header";
import Default from "./components/modal/Default";
import Confirm from "./components/modal/Confirm";
import {selectModalConfirm, selectModalDefault, selectIsLoggedIn, setIsLoggedIn, setUserProfile} from "./app/slice";
import {onAuthStateChanged,} from "firebase/auth";
import {firestore, auth} from "./firebase/Firebase"
import {Layout} from 'antd';
import {reProfileApi} from "./api/adaptor.api";
const {Content} = Layout;

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const modalDefault = useSelector(selectModalDefault);
    const modalConfirm = useSelector(selectModalConfirm);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [init, setInit] = useState(false);
    const showCommon = !["/", "/join-detail", "/join-simple"].includes(location.pathname) && isLoggedIn

    useEffect(()=>{
        console.log("onAuthStateChanged")
        onAuthStateChanged(auth, (userInfo) => {
            if(userInfo) {
                console.log("logged in")
                dispatch(setIsLoggedIn(true));
            } else {
                console.log("logged out")
                dispatch(setIsLoggedIn(false));
            }
            reProfileApi(userInfo?.uid);
            setInit(true)
        });
    },[]);

    return (
        <>
            <Layout style={{minHeight: '100vh'}}>
                <Layout className="site-layout">
                    {
                        init
                            ? (
                                <>
                                    {showCommon && <HeaderC/>}
                                    <Content>
                                        <Routes>
                                            {
                                                isLoggedIn
                                                    ? (
                                                        <>
                                                            {
                                                                AuthRouteList.map((item, index) => (
                                                                    <Route key={index} {...item} />
                                                                ))
                                                            }
                                                            <Route path='*' element={<Navigate replace to='/main'/>} />
                                                        </>
                                                    )
                                                    : (
                                                        <>
                                                            {
                                                                RouteList.map((item, index) => (
                                                                    <Route key={index} {...item} />
                                                                ))
                                                            }
                                                            <Route path='*' element={<Navigate replace to='/'/>} />
                                                        </>
                                                    )

                                            }
                                        </Routes>

                                    </Content>
                                    {showCommon && <FooterC/>}
                                </>
                            ) : null
                    }
                </Layout>
            </Layout>
            {modalDefault.show && <Default/>}
            {modalConfirm.show && <Confirm />}
        </>
    );
};

export default App;
