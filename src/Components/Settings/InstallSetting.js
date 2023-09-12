import React, { useState, useEffect, useRef } from 'react';
import useInstallFormContext from "../../hooks/useInstallFormContext";
import { Button } from "@kube-design/components";
import useClusterTableContext from "../../hooks/useClusterTableContext";
import clusterTable from "../ClusterTable/ClusterTable";

const InstallSetting = () => {
    const jsyaml = require('js-yaml');
    const [logs, setLogs] = useState([]);
    const socketRef = useRef(null);
    const logsRef = useRef([]);
    const logContainerRef = useRef(null);

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);
    const {clusterData,handleChange} = useClusterTableContext()
    const { data, ksVersion, KubekeyNamespace} = useInstallFormContext();

    const onClickHandler = e => {
        console.log("data is,",data)
        socketRef.current = new WebSocket(`ws://localhost:8082/createCluster?clusterName=${data.metadata.name}&ksVersion=${ksVersion}&KubekeyNamespace=${KubekeyNamespace}`);
        socketRef.current.addEventListener('open', () => {
            socketRef.current.send(jsyaml.dump(data));
        });

        socketRef.current.addEventListener('message', (event) => {
            console.log('Message from server: ', event.data);
            logsRef.current.push(event.data);
            setLogs([...logsRef.current]);
        });
    };
    const onClickHandler2 = () =>{
        console.log('click2')
        console.log(data)
        handleChange(data)
    }
    const scrollToBottom = () => {
        logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    };
    const onClickHandler3 = () => {
        // console.log('1211212',clusterData)
    }

    return (
        <div>
            install界面
            <Button onClick={onClickHandler}>安装</Button>
            <Button onClick={onClickHandler2}>添加</Button>
            <Button onClick={onClickHandler3}>显示</Button>
            <Button onClick={scrollToBottom} style={{ margin: '10px 0' }}>Scroll to Bottom</Button>
            <div ref={logContainerRef} style={{
                backgroundColor: '#1e1e1e',
                color: '#ffffff',
                padding: '10px',
                borderRadius: '5px',
                maxHeight: '500px',
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
        </div>
    );
};

export default InstallSetting;
