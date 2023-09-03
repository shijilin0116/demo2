import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CssBaseline, KubedConfigProvider} from '@kubed/components';
import App from "./App";
import "@kube-design/components/esm/styles/index.css";
const Application = () => (
    // <LocaleProvider locales={locales} currentLocale="en">
    //     <App />
    // </LocaleProvider>
    <KubedConfigProvider>
        <CssBaseline /> {/* 规范化样式 */}
        <App /> {/* 你的应用程序的根组件 */}
    </KubedConfigProvider>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(<Application />, document.getElementById('root'));
