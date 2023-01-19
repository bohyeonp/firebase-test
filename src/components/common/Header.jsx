import React from 'react';
import {Layout,  Space, Button} from "antd";
import {Link, useNavigate} from "react-router-dom";
import {
    SettingOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import {auth} from "../../firebase/Firebase"
import {signOut} from "firebase/auth";

const { Header } = Layout;

function HeaderC() {
    const navigate = useNavigate();

    return (
        <Header
            style={{
                backgroundColor : "#001529",
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px"
            }}
        >
            <div className="header-logo">
                <Link to={"/main"}  style={{letterSpacing: '5px', color: '#fff', fontSize: '24px'}}>
                    B<span style={{fontSize: '16px'}}>🤍</span>S<span style={{fontSize: '16px'}}>🤍</span>
                </Link>
            </div>
            <div className="header-icon" style={{marginTop : '5px'}}>
                <Space>
                    <Space wrap>
                        <Button
                            type="text"
                            icon={<SettingOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                            onClick={() => navigate('/setting')}
                        />
                        <Button
                            type="text"
                            icon={<UserOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                            onClick={() => navigate('/my')}
                        />
                        <Button
                            type="text"
                            icon={<ShoppingCartOutlined style={{ color: '#fff', fontSize: '24px' }} />}
                            onClick={() => navigate('/cart')}
                        />
                        <Button
                            type="text"
                            icon={<LogoutOutlined  style={{ color: '#fff', fontSize: '24px' }} />}
                            onClick={() => signOut(auth)}
                        />
                    </Space>
                </Space>
            </div>
        </Header>
    );
}

export default HeaderC;
