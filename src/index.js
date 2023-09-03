import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, KubedConfigProvider} from '@kubed/components';
import App from "./App";
import "@kube-design/components/esm/styles/index.css";
import {HashRouter} from "react-router-dom";
const Application = () => (
    // <LocaleProvider locales={locales} currentLocale="en">
    //     <App />
    // </LocaleProvider>
    <HashRouter>
        <KubedConfigProvider>
            <CssBaseline /> {/* 规范化样式 */}
            <App /> {/* 你的应用程序的根组件 */}
        </KubedConfigProvider>
    </HashRouter>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(<Application />, document.getElementById('root'));
