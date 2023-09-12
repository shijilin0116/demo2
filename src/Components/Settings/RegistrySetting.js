import React from 'react';
import useInstallFormContext from "../../hooks/useInstallFormContext";
import {Column, Input, Columns, Toggle} from "@kube-design/components";
const RegistrySetting = () => {
    const { data, handleChange } = useInstallFormContext()

    const changeUsePrivateRegistryHandler= e => {
        if(!e) {
            handleChange('privateRegistryUrl','')
        }
        handleChange('usePrivateRegistry',e)
    }

    const changePrivateRegistryUrlHandler= e => {
        handleChange('spec.registry.privateRegistry',e.target.value)
    }

    return (
        <div>
            <Columns>
                <Column className={'is-2'}>
                    使用私有镜像仓库
                </Column>
                <Column>
                    {/*TODO 如何做*/}
                    <Toggle checked={data.usePrivateRegistry} onChange={changeUsePrivateRegistryHandler} okText="开启" offText="关闭" />
                </Column>
            </Columns>
            <Columns >
                <Column className={'is-2'}>私有镜像仓库Url:</Column>
                <Column>
                    <Input style={{width:'100%'}} value={data.spec.registry.privateRegistry} onChange={changePrivateRegistryUrlHandler} disabled={!data.usePrivateRegistry} />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>仓库镜像Url:</Column>
                <Column >
                    <div>需要一个动态添加的输入框</div>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>非安全仓库:</Column>
                <Column >
                    需要一个动态添加的输入框
                </Column>
            </Columns>

        </div>
    )
};

export default RegistrySetting;
