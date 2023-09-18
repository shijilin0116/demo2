import React, {useEffect, useRef, useState} from 'react';
import {Button, Modal} from "@kubed/components";
import useInstallFormContext from "../../hooks/useInstallFormContext";
import {Column, Columns} from "@kube-design/components";


const HostDeleteConfirmModal = ({record,curClusterData}) => {

    const { data, handleChange } = useInstallFormContext()

    const [visible, setVisible] = React.useState(false);

    const [logs, setLogs] = useState([]);

    const [closable,setClosable] = useState(true)

    const ref = React.createRef();
    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        if (socketRef.current) {
            socketRef.current.close();
            console.log('关闭websocket')
        }
        logsRef.current=[]
        setLogs([])
        setVisible(false)
    };
    const socketRef = useRef(null);
    const logsRef = useRef([]);
    const logContainerRef = useRef(null);
    useEffect(() => {
        // 清理函数，在组件卸载时销毁websocket连接
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log('关闭websocket')
            }
        };
    }, []);
    const onOKHandler = () => {
        if(logs.length>0) {
            if (socketRef.current) {
                socketRef.current.close();
                console.log('关闭websocket')
            }
            logsRef.current = []
            setLogs([])
            setVisible(false)
        } else {
            socketRef.current = new WebSocket(`ws://localhost:8082/deleteNode?hostName=${record.name}&clusterName=${curClusterData.metadata.name}`);

            socketRef.current.addEventListener('open', () => {
                console.log('WebSocket is open now.');
                // 可以在这里发送任何需要的初始数据
                // socket.send('Your message');
            });

            socketRef.current.addEventListener('message', (event) => {
                console.log('Message from server: ', event.data);
                // 在这里处理从服务器接收到的消息
                logsRef.current.push(event.data);
                setLogs([...logsRef.current]);
            });

            socketRef.current.addEventListener('close', () => {
                console.log('WebSocket is closed now.');
                // 在这里处理WebSocket关闭事件
            });

            socketRef.current.addEventListener('error', (event) => {
                console.error('WebSocket error: ', event);
                // 在这里处理WebSocket错误事件
            });
        }

    }

    const textStyle={
        fontSize:"20px",
        height: '20px',
        margin: 0, /* 清除默认的外边距 */
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div>
            <Button variant="link" onClick={openModal}>删除节点</Button>
            <Modal
                width="1000px"
                closable={closable}
                ref={ref}
                visible={visible}
                title="删除节点"
                onCancel={closeModal}
                onOk={onOKHandler}
            >
                <Columns>
                    <Column className='is-1'></Column>
                    <Column className='is-10'>
                        <div style={{ height:'30px',display:`flex`, alignItems: 'center' }}>
                            <p style={textStyle}>确定删除该节点吗？</p>
                        </div>
                    </Column>
                </Columns>
                <Columns>
                    <Column className='is-1'></Column>
                    <Column className='is-10'>
                        <div ref={logContainerRef} style={{
                            minHeight:0,
                            backgroundColor: '#1e1e1e',
                            color: '#ffffff',
                            padding: '5px',
                            borderRadius: '5px',
                            maxHeight: '300px',
                            overflowY: 'scroll',
                            fontFamily: 'Consolas, "Courier New", monospace',
                            fontSize: '14px',
                            lineHeight: '1.5'
                        }}>
                            {logs.map((log, index) => (
                                <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </Column>
                </Columns>
            </Modal>
        </div>
    );
};

export default HostDeleteConfirmModal;
