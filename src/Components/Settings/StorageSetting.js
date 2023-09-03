import React from 'react';
import useFormContext from "../../hooks/useFormContext";
import {Column, Columns, Toggle} from "@kube-design/components";

const StorageSetting = () => {

    const { data, handleChange } = useFormContext()

    const changeEnableLocalStorageHandler = e =>  {
        handleChange('enableLocalStorage',e)
    }

    console.log(data.nodes.filter((item) => item.nodeName.indexOf('node1') !== -1))

    return (
        <div>
            <Columns >
                <Column className={'is-2'}>是否开启本地存储:</Column>
                <Toggle checked={data.enableLocalStorage} onChange={changeEnableLocalStorageHandler} onText="开启" offText="关闭" />
            </Columns>
        </div>
    )
};

export default StorageSetting;
