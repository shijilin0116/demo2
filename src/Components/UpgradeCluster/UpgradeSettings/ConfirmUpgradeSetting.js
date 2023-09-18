import React, { useState, useEffect, useRef } from 'react';
import useInstallFormContext from "../../../hooks/useInstallFormContext";
import { Button } from "@kube-design/components";
import useClusterTableContext from "../../../hooks/useClusterTableContext";

const ConfirmUpgradeClusterSetting = () => {
    // const jsyaml = require('js-yaml');
    // const [logs, setLogs] = useState([]);
    // const socketRef = useRef(null);
    // const logsRef = useRef([]);
    // const logContainerRef = useRef(null);
    //
    // useEffect(() => {
    //     // 清理函数，在组件卸载时销毁websocket连接
    //     return () => {
    //         if (socketRef.current) {
    //             socketRef.current.close();
    //         }
    //     };
    // }, []);
    // const {clusterData,handleChange} = useClusterTableContext()
    // const { data, ksVersion, KubekeyNamespace,buttonDisabled,setButtonDisabled} = useInstallFormContext();
    //
    // const onClickHandler = e => {
    //     console.log("data is,",data)
    //     socketRef.current = new WebSocket(`ws://localhost:8082/createCluster?clusterName=${data.metadata.name}&ksVersion=${ksVersion}&KubekeyNamespace=${KubekeyNamespace}`);
    //     // socketRef.current = new WebSocket(`ws://139.196.14.61:8082/createCluster?clusterName=${data.metadata.name}&ksVersion=${ksVersion}&KubekeyNamespace=${KubekeyNamespace}`);
    //     socketRef.current.addEventListener('open', () => {
    //         logsRef.current.push('安装开始，请勿进行其他操作！');
    //         setLogs([...logsRef.current]);
    //         console.log('WebSocket is open now.');
    //         setButtonDisabled(true)
    //         socketRef.current.send(jsyaml.dump(data));
    //     });
    //
    //     socketRef.current.addEventListener('message', (event) => {
    //         console.log('Message from server: ', event.data);
    //         if(event.data==='安装成功') {
    //             setButtonDisabled(false)
    //         }
    //         if(event.data==='安装失败') {
    //             setButtonDisabled(false)
    //
    //         }
    //         logsRef.current.push(event.data);
    //         setLogs([...logsRef.current]);
    //     });
    //     socketRef.current.addEventListener('close', () => {
    //         console.log('WebSocket is closed now.');
    //         // 在这里处理WebSocket关闭事件
    //     });
    //
    //     socketRef.current.addEventListener('error', (event) => {
    //         console.error('WebSocket error: ', event);
    //         // 在这里处理WebSocket错误事件
    //     });
    // };
    //
    // return (
    //     <div>
    //         <Button onClick={onClickHandler} disabled={buttonDisabled}>安装</Button>
    //         <div ref={logContainerRef} style={{
    //             backgroundColor: '#1e1e1e',
    //             color: '#ffffff',
    //             padding: '10px',
    //             borderRadius: '5px',
    //             maxHeight: '500px',
    //             overflowY: 'scroll',
    //             fontFamily: 'Consolas, "Courier New", monospace',
    //             fontSize: '14px',
    //             lineHeight: '1.5'
    //         }}>
    //             {logs.map((log, index) => (
    //                 <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
    //                     {log}
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
    return 1;
};

export default ConfirmUpgradeClusterSetting;
