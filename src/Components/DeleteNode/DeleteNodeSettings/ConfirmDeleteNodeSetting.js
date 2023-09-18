import React, {useEffect, useRef, useState} from 'react';
import useDeleteNodeFormContext from "../../../hooks/useDeleteNodeFormContext";
import useClusterTableContext from "../../../hooks/useClusterTableContext";
import useInstallFormContext from "../../../hooks/useInstallFormContext";
import jsyaml from "js-yaml";
import {Button} from "@kube-design/components";

const ConfirmDeleteNodeSetting = ({clusterName}) => {
    const {curCluster,curSelectedNodeName} = useDeleteNodeFormContext();
    const jsyaml = require('js-yaml');
    const [logs, setLogs] = useState([]);
    const socketRef = useRef(null);
    const logsRef = useRef([]);
    const logContainerRef = useRef(null);

    useEffect(() => {
        // 清理函数，在组件卸载时销毁websocket连接
        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, []);

    const deleteTargetHosts= (cluster,deleteTargetHosts) => {
        const tempCluster = cluster
        console.log('cluster0:',tempCluster)
        console.log(tempCluster.spec.hosts)
        console.log(tempCluster.spec.roleGroups.etcd)
        console.log(tempCluster.spec.roleGroups.master)
        console.log(tempCluster.spec.roleGroups.worker)
        console.log(tempCluster.spec.system.ntpServers)

        // Step 1: 删除 hosts 中名为 deleteTargetHosts 数组中的任何名称的对象
        tempCluster.spec.hosts = tempCluster.spec.hosts.filter(host => !deleteTargetHosts.includes(host.name));
        tempCluster.spec.roleGroups.etcd =  tempCluster.spec.roleGroups.etcd.filter(host => !deleteTargetHosts.includes(host));
        tempCluster.spec.roleGroups.master =  tempCluster.spec.roleGroups.master.filter(host => !deleteTargetHosts.includes(host));
        tempCluster.spec.roleGroups.worker =  tempCluster.spec.roleGroups.worker.filter(host => !deleteTargetHosts.includes(host));
        tempCluster.spec.system.ntpServers = tempCluster.spec.system.ntpServers.filter(server => !deleteTargetHosts.includes(server));
        console.log('cluster:',tempCluster)
        return tempCluster
    }

    const onClickHandler = e => {
        const deletedData = deleteTargetHosts(curCluster,curSelectedNodeName)
        console.log('new data is,',curCluster)
        socketRef.current = new WebSocket(`ws://localhost:8082/deleteNode?clusterName=${deletedData.metadata.name}`);
        // socketRef.current = new WebSocket(`ws://139.196.14.61:8082/createCluster?clusterName=${data.metadata.name}&ksVersion=${ksVersion}&KubekeyNamespace=${KubekeyNamespace}`);
        socketRef.current.addEventListener('open', () => {
            console.log('WebSocket is open now.');
            // setButtonDisabled(true)
            socketRef.current.send(jsyaml.dump(deletedData));
        });

        socketRef.current.addEventListener('message', (event) => {
            console.log('Message from server: ', event.data);
            if(event.data==='安装成功' || event.data==='安装失败') {
                // setButtonDisabled(false)
            }
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
    };
    return (
        <div>
            <div>
                已选节点：
                {curSelectedNodeName}
                当前集群：
                {clusterName}
            </div>
            <Button onClick={onClickHandler}>删除</Button>
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

export default ConfirmDeleteNodeSetting;
