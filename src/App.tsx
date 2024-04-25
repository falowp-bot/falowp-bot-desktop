import React from 'react';
import {Avatar, Layout, theme} from 'antd';

const {Content, Sider} = Layout;

const App: React.FC = () => {
    const {token: {colorBgContainer}} = theme.useToken();

    return (
        <Layout style={{width: 960, height: 600, background: colorBgContainer}}>
            <Layout>
                <Sider width={60} style={{background: '#f5f5f5', display: "flex", justifyContent: "center"}}>
                    <Avatar size={40} style={{marginTop: 20}} src="https://q1.qlogo.cn/g?b=qq&nk=1964572698&s=640"/>
                </Sider>
                <Layout style={{padding: 0}}>
                    <Content style={{background: colorBgContainer}}>
                        <div style={{padding: 24}}>
                            Content
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;