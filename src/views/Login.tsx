import {invoke} from "@tauri-apps/api/core";
import './Login.css'
import {Button, Form, FormInstance, Input} from "antd";
import React, {useEffect, useState} from "react";

interface LoginType {
    server_url: string;
    password: string;
}


function Login() {
    const loginFormRef = React.createRef<FormInstance<LoginType>>()

    const [loginData, setLoginData] = useState<LoginType>({
        server_url: '',
        password: ''
    });

    useEffect(() => {
        nativeGetLoginCache().then(res => {
            const value = {server_url: res.server_url, password: res.password}
            loginFormRef.current?.setFieldsValue(value)
            setLoginData(value)
        })
    }, []);

    const onFinish = async (values: LoginType) => {
        setLoginData({server_url: "xxx", password: "zzz"})
        await nativeLogin(values.server_url, values.password);
    };

    async function nativeLogin(serverUrl: String, password: String) {
        await invoke("login", {serverUrl, password});
    }

    async function nativeGetLoginCache(): Promise<LoginType> {
        return await invoke("get_login_cache");
    }

    return (
        <div className="login-div">
            <div className="login-div-color"></div>
            <div className="login-body">
                <h1>小花落Bot</h1>
                <Form
                    ref={loginFormRef}
                    name="login-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{width: 250, marginTop: 20}}
                    onFinish={onFinish}
                    autoComplete="off">
                    <Form.Item<LoginType>
                        label=""
                        name="server_url">
                        <Input value={loginData.server_url} placeholder="输入服务器地址"/>
                    </Form.Item>

                    <Form.Item<LoginType>
                        label=""
                        name="password">
                        <Input.Password value={loginData.password} placeholder="输入密码"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: 250, marginTop: 20}}>
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
