import React, {useEffect} from 'react';
import useFormContext from "../../hooks/useFormContext";

const InstallSetting = () => {
    useEffect(() => {
        // 创建一个WebSocket连接
        const socket = new WebSocket('ws://localhost:8082/websocket');

        // 定义连接打开时的回调函数
        socket.addEventListener('open', () => {
            // WebSocket连接成功后，发送'hello'消息
            socket.send('hello');
        });

        // 定义接收消息时的回调函数
        socket.addEventListener('message', (event) => {
            console.log('Message from server: ', event.data);
        });

        // 返回一个清理函数，用于在组件卸载时关闭WebSocket连接
        return () => {
            socket.close();
        };
    }, []); // 依赖列表为空，这意味着useEffect只在组件挂载时运行
    const { data } = useFormContext()
    console.log(data)
    return (
        <div>
            install界面
        </div>
    );
};

export default InstallSetting;
