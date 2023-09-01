import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Banner, Button, Col, CssBaseline, KubedConfigProvider, Row} from '@kubed/components';
import {TableChart} from "@kubed/icons";
import App from "./App";



const Application = () => (
    <KubedConfigProvider>
        <CssBaseline /> {/* 规范化样式 */}
        <App/> {/* 你的应用程序的根组件 */}
        {/*<WorkSteps></WorkSteps>*/}
    </KubedConfigProvider>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//       <HelloWorldComponent></HelloWorldComponent>
//   </React.StrictMode>
// );
ReactDOM.render(<Application />, document.getElementById('root'));
