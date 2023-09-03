import React from 'react';
import useFormContext from "../hooks/useFormContext";

const ProgressBar = () => {
    const {page,title} = useFormContext()
    const ongoingIndexCircleStyle = {
        marginRight: '10px',
        width: '20px',             // 正方形的大小
        height: '20px',            // 正方形的大小
        borderRadius: '50%',       // 边框为 50% 得到圆角
        backgroundColor: '#1C8FFC',   // 背景色为蓝色
        color: 'white',            // 数字的颜色为白色
        display: 'flex',           // 使用flex布局来居中数字
        alignItems: 'center',      // 垂直居中
        justifyContent: 'center',  // 水平居中
        fontSize: '13px'           // 设置字体大小
    };
    const finishedIndexCircleStyle = {
        marginRight: '10px',
        width: '20px',             // 正方形的大小
        height: '20px',            // 正方形的大小
        borderRadius: '50%',       // 边框为 50% 得到圆角
        border: '1px solid #7eb8dc',
        backgroundColor: 'white',   // 背景色为蓝色
        color: '#7eb8dc',            // 数字的颜色为白色
        display: 'flex',           // 使用flex布局来居中数字
        alignItems: 'center',      // 垂直居中
        justifyContent: 'center',  // 水平居中
        fontSize: '13px'           // 设置字体大小
    };
    const unfinishedIndexCircleStyle = {
        marginRight: '10px',
        width: '20px',             // 正方形的大小
        height: '20px',            // 正方形的大小
        borderRadius: '50%',       // 边框为 50% 得到圆角
        border: '1px solid #abb4be',
        backgroundColor: 'white',   // 背景色为蓝色
        color: '#abb4be',            // 数字的颜色为白色
        display: 'flex',           // 使用flex布局来居中数字
        alignItems: 'center',      // 垂直居中
        justifyContent: 'center',  // 水平居中
        fontSize: '13px'           // 设置字体大小
    }
    const IndexItem = (step) => {
        if(step<page)       return <div style={finishedIndexCircleStyle}>✔</div>
        else if(step===page) return <div style={ongoingIndexCircleStyle}>{step+1}</div>
        else                 return <div style={unfinishedIndexCircleStyle}>{step+1}</div>
    }
    const steps = Object.keys(title).map((step,index) => {
        return (
            <div style={{display:`flex`, alignItems: 'center' }} key={index}>
                {IndexItem(+step)}
                <p >{title[step]}</p>
            </div>
        )
    })
    return (
        <div>
            {steps}
        </div>
    );
};

export default ProgressBar;
