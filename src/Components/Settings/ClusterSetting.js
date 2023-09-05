import React, {useEffect, useState} from 'react';
import useFormContext from "../../hooks/useFormContext";
import {Column, Input, Columns, Select, Toggle, RadioGroup} from "@kube-design/components";

const ClusterSetting = () => {
    const [clusterVersionOptions,setClusterVersionOptions] = useState([])
    const containerManagerOptions = [
        { value:'docker', label:'docker' },
        { value:'containerd', label:'containerd' },
        // 暂不支持
        // { value:'crio', label:'crio' },
        // { value:'isula', label:'isula' }
    ]
    const { data, handleChange } = useFormContext()
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
    const changeKubekeyNamespaceHandler = e => {
        handleChange('KubekeyNamespace',e.target.value)
    }

    useEffect(()=>{
        fetch('http://localhost:8082/clusterVersionOptions')
            .then((res)=>{
            return res.json()
        }).then(data => {
            console.log(data.clusterVersionOptions)
            setClusterVersionOptions(data.clusterVersionOptions.map(item => ({ value: item, label: item })))
            console.log(clusterVersionOptions)
        }).catch(()=>{

        })

    },[])

    return (
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
                <Column>
                    <Toggle checked={data.autoRenewCert} onChange={changeAutoRenewHandler} onText="开启" offText="关闭" />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    容器运行时：
                </Column>
                <Column>
                    <RadioGroup options={containerManagerOptions} value={data.containerManager} onChange={changeContainerManagerHandler} />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Kubekey命名空间：
                </Column>
                <Column>
                    <Input placeholder="默认为kubekey-system" value={data.KubekeyNamespace} onChange={changeKubekeyNamespaceHandler} />
                </Column>
            </Columns>
        </div>
    )
};

export default ClusterSetting;
