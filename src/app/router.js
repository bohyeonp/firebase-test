import Login from "../pages/Login"
import Join from "../pages/Join";
import Main from "../pages/Main"
import Mypage from "../pages/Mypage";

const RouteList = [
    {
        path : '/',
        element :  <Login/>
    },
    {
        path : '/join/:type',
        element :  <Join/>
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
