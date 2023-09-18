import React, { useEffect, useRef } from 'react';
import useInstallFormContext from "../../../hooks/useInstallFormContext";


const ConfirmInstallSetting = () => {

    const logContainerRef = useRef(null);

    const { logs,socketRef} = useInstallFormContext();

    // useEffect(() => {
    //     // 清理函数，在组件卸载时销毁websocket连接
    //     return () => {
    //         if (socketRef.current) {
    //             socketRef.current.close();
    //         }
    //     };
    // }, []);


    return (
        <div>
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

export default ConfirmInstallSetting;
