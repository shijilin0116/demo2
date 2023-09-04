import React from 'react';
import useFormContext from "../../hooks/useFormContext";

const InstallSetting = () => {
    const { data } = useFormContext()
    console.log(data)
    return (
        <div>
            install界面
        </div>
    );
};

export default InstallSetting;
