import React from 'react';
import useInstallFormContext from "../../../hooks/useInstallFormContext";
import {Column, Columns, Toggle, Tooltip} from "@kube-design/components";
import useUpgradeClusterFormContext from "../../../hooks/useUpgradeClusterFormContext";

const UpgradeStorageSetting = () => {

    const { curCluster } = useUpgradeClusterFormContext
    // TODO
    const changeEnableLocalStorageHandler = e =>  {
        // if(!e) {
        //     handleChange('installKubesphere',false)
        //     handleChange('KubesphereVersion','')
        // }
        // handleChange('enableLocalStorage',e)
    }

    return (
        // TODO 待处理 开启本地存储
        <div>
            <Columns >
                <Column className={'is-2'}>是否开启本地存储:</Column>
                <Column>
                    <Tooltip content={'安装kubesphere必须开启本地存储'}>
                        <Toggle checked={true} onChange={changeEnableLocalStorageHandler} disabled={true} onText="开启" offText="关闭" />
                    </Tooltip>
                </Column>
            </Columns>
        </div>
    )
};

export default UpgradeStorageSetting;
