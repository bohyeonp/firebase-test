import Login from "../pages/Login"
import Join from "../pages/Join";
import Main from "../pages/Main"
import Mypage from "../pages/Mypage";
import Setting from "../pages/Setting";
import Cart from "../pages/Cart";
import Detail from "../pages/Detail";

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
    },
    {
        path : '/setting',
        element :  <Setting/>
    },
    {
        path : '/cart',
        element :  <Cart/>
    },
    {
        path : '/detail/:id',
        element :  <Detail/>
    }
]

export {RouteList, AuthRouteList};
