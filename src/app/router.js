import Login from "../pages/Login"
import Detail from "../pages/join/Detail";
import Simple from "../pages/join/Simple";
import Main from "../pages/Main"
import Mypage from "../pages/Mypage";

const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join-detail',
        element :  <Detail/>
    },
    {
        path : '/join-simple',
        element :  <Simple/>
    }
]

const AuthRouteList = [
    {
        path : '/main',
        element :  <Main/>
    },
    {
        path : '/my-page',
        element :  <Mypage/>
    }
]

export {RouteList, AuthRouteList};
