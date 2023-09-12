import React from 'react';
import useInstallFormContext from "../../hooks/useInstallFormContext";
import {Column, Columns, Toggle} from "@kube-design/components";

const StorageSetting = () => {

    const { data, handleChange } = useInstallFormContext()
    // TODO
    const changeEnableLocalStorageHandler = e =>  {
        // if(!e) {
        //     handleChange('installKubesphere',false)
        //     handleChange('KubesphereVersion','')
        // }
        // handleChange('enableLocalStorage',e)
    }

    console.log(data.spec.hosts.filter((item) => item.name.indexOf('node1') !== -1))

    return (
        // TODO 待处理
        <div>
            <Columns >
                <Column className={'is-2'}>是否开启本地存储:</Column>
                <Column>
                    <Toggle checked={data.spec.storage.openebs} onChange={changeEnableLocalStorageHandler} onText="开启" offText="关闭" />
                </Column>

            </Columns>
        </div>
    )
};

export default StorageSetting;
