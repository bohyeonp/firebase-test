import React , {useEffect, useState}from 'react';
import FooterC from "./components/common/Footer";
import HeaderC from "./components/common/Header";
import 'antd/dist/antd.css';
import './index.css';
import { Layout} from 'antd';
import {Routes, Route, useLocation, Navigate } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {setIsLoggedIn, selectIsLoggedIn, setUserProfile} from "./app/slice";
import {RouteList, AuthRouteList} from "./app/router";
import {onAuthStateChanged,} from "firebase/auth";
import {firestore, auth} from "./firebase/Firebase"
const {Content} = Layout;


const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [init, setInit] = useState(false);
    const showCommon = !["/", "/join-detail", "/join-simple"].includes(location.pathname) && isLoggedIn

    useEffect(()=>{
        console.log("onAuthStateChanged")
        onAuthStateChanged(auth, (userInfo) => {
            if(userInfo) {
                // logged in
                console.log("logged in")
                dispatch(setIsLoggedIn(true));
            } else {
                // logged out
                console.log("logged out")
                dispatch(setIsLoggedIn(false));
            }
            const user = firestore.collection("user");
            user.get().then((doc) => {
                doc.forEach((doc2)=>{
                    if(doc2.id === userInfo?.uid){
                        dispatch(setUserProfile(doc2.data()));
                    }
                })
            });
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
        </>
    );
};

export default App;
