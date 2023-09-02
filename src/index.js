import React, {useState} from 'react';
import { Component } from "react";
import ReactDOM from 'react-dom';
import './index.css';
import {Banner, Button, Col, LocaleProvider, Row} from '@kube-design/components';
import { CssBaseline, KubedConfigProvider} from '@kubed/components';
import {TableChart} from "@kubed/icons";
import App from "./App";
import "@kube-design/components/esm/styles/index.css";
import locales from "./locales";
import NodeAddModal from "./Components/Modal/NodeAddModal";
// import "@kube-design/components/esm/styles/main.scss";


const Application = () => (
    // <LocaleProvider locales={locales} currentLocale="en">
    //     <App />
    // </LocaleProvider>
    <KubedConfigProvider>
        <CssBaseline /> {/* 规范化样式 */}
        <App /> {/* 你的应用程序的根组件 */}
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
