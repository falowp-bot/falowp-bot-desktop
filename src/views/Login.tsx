import {invoke} from "@tauri-apps/api/tauri";
import './Login.css'
import {Button, Form, Input} from "antd";
import {useEffect, useState} from "react";

interface LoginType {
    serverUrl: string;
    password: string;
}


function Login() {

    useEffect(() => {
        setLoginData({serverUrl: "", password: ""})
        //nativeGetLoginCache().then(res => setLoginData(res))
    }, []); //

    const [loginData, setLoginData] = useState<LoginType>({
        serverUrl: '',
        password: ''
    });

    const onFinish = async (values: LoginType) => {
        await nativeLogin(values.serverUrl, values.password);
    };

    async function nativeLogin(serverUrl: String, password: String) {
        await invoke("login", {serverUrl, password});
    }

   /* async function nativeGetLoginCache(): Promise<LoginType> {
        return await invoke("get_login_cache");
    }*/

    return (
        <div className="login-div">
            <div className="login-div-color"></div>
            <div className="login-body">
                <h1>Falowp Bot</h1>
                <Form
                    name="login-form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{width: 250, marginTop: 20}}
                    onFinish={onFinish}
                    autoComplete="off">
                    <Form.Item<LoginType>
                        label=""
                        name="serverUrl">
                        <Input value={loginData.serverUrl} placeholder="输入服务器地址"/>
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
