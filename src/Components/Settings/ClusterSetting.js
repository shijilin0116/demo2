import React from 'react';
import useFormContext from "../../hooks/useFormContext";
import {Column, Input, Columns, Select, Toggle, RadioGroup} from "@kube-design/components";

const ClusterSetting = () => {
    const clusterVersionOptions = [
        {
            value:'v1.2',
            label:'v1.2'
        }, {
            value:'v1.3',
            label:'v1.3'
        },{
            value:'v1.5',
            label:'v1.5'
        },{
            value:'v1.7',
            label:'v1.7'
        },{
            value:'v1.8',
            label:'v1.8'
        },
    ]

    const containerManagerOptions = [
        {
            value:'docker',
            label:'docker'
        }, {
            value:'containerd',
            label:'containerd'
        },{
            value:'crio',
            label:'crio'
        },{
            value:'isula',
            label:'isula'
        }
    ]
    const { data, handleChange } = useFormContext()
    console.log(data)
    const changeClusterVersionHandler = e => {
        handleChange('clusterVersion',e)
    }
    const changeClusterNameHandler = e => {
        handleChange('clusterName',e.target.value)
    }
    const changeAutoRenewHandler = e => {
        handleChange('autoRenewCert',e)
    }
    const changeContainerManagerHandler = e => {
        handleChange('containerManager',e)
    }
    const content = (
        <div>
            <Columns>
            <Column className={'is-2'}>
                Kubernetes版本：
            </Column>
            <Column>
                <Select value={data.clusterVersion} options={clusterVersionOptions} onChange={changeClusterVersionHandler} />
            </Column>
        </Columns>
        <Columns>
            <Column className={'is-2'}>Kubernetes集群名称:</Column>
            <Column >
                <Input onChange={changeClusterNameHandler} value={data.clusterName} placeholder="请输入要创建的Kubernetes集群名称" />
            </Column>
        </Columns>
        <Columns>
            <Column className={'is-2'}>是否自动续费证书:</Column>
            <Toggle checked={data.autoRenewCert} onChange={changeAutoRenewHandler} onText="开启" offText="关闭" />
        </Columns>
        <Columns>
            <Column className={'is-2'}>
                容器运行时：
            </Column>
            <Column>
                <RadioGroup options={containerManagerOptions} value={data.containerManager} onChange={changeContainerManagerHandler} />
            </Column>
        </Columns>
        </div>
    )
    return content;
};

export default ClusterSetting;
