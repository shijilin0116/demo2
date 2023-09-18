import React, {useEffect, useState} from 'react';
import useInstallFormContext from "../../../hooks/useInstallFormContext";
import {Column, Input, Columns, Select, Toggle, RadioGroup, Radio, Tooltip} from "@kube-design/components";
import useUpgradeClusterFormContext from "../../../hooks/useUpgradeClusterFormContext";

const UpgradeClusterSetting = () => {
    const [clusterVersionOptions,setClusterVersionOptions] = useState([])
    const { curCluster, handleChange, KubekeyNamespace, setKubekeyNamespace} = useUpgradeClusterFormContext()
    console.log('----curCluster----',curCluster)
    console.log('*****',curCluster)
    const changeClusterVersionHandler = e => {
        handleChange('spec.kubernetes.version',e)
        handleChange('spec.kubernetes.containerManager','')
    }
    const changeClusterNameHandler = e => {
        handleChange('metadata.name',e.target.value)
    }
    const changeAutoRenewHandler = e => {
        handleChange('spec.kubernetes.autoRenewCerts',e)
    }
    const changeContainerManagerHandler = e => {
        // console.log('e is',e )
        handleChange('spec.kubernetes.containerManager',e.target.name)
    }
    const changeKubekeyNamespaceHandler = e => {
        setKubekeyNamespace(e.target.value)
    }
    useEffect(()=>{
        if(Object.keys(curCluster).length>0){
            fetch('http://localhost:8082/clusterVersionOptions')
                // fetch('http://139.196.14.61:8082/clusterVersionOptions')
                .then((res)=>{
                    return res.json()
                }).then(data => {
                const targetClusterVersionList = data.clusterVersionOptions.filter(item=>(item>curCluster.spec.kubernetes.version))
                setClusterVersionOptions(targetClusterVersionList.map(item => ({ value: item, label: item })))
                console.log(clusterVersionOptions)
            }).catch(()=>{

            })
        }

    },[curCluster])

    return (
        <div>
            <Columns>
                <Column className={'is-2'}>
                    Kubernetes目标升级版本：
                </Column>
                <Column>
                    <Select value={Object.keys(curCluster).length>0?curCluster.spec.kubernetes.version:''} options={clusterVersionOptions} onChange={changeClusterVersionHandler} />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>Kubernetes集群名称:</Column>
                <Column >
                    <Input onChange={changeClusterNameHandler} value={Object.keys(curCluster).length>0?curCluster.metadata.name:''} placeholder="请输入要创建的Kubernetes集群名称" />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>是否自动续费证书:</Column>
                <Column>
                    <Toggle checked={Object.keys(curCluster).length>0?curCluster.spec.kubernetes.autoRenewCerts:false} onChange={changeAutoRenewHandler} onText="开启" offText="关闭" />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    容器运行时：
                </Column>
                <Column>
                    <Tooltip content={"v1.24.0及以上版本集群不支持docker作为容器运行时"}>
                        <Radio name="docker" checked={Object.keys(curCluster).length>0?curCluster.spec.kubernetes.containerManager === 'docker':false} onChange={changeContainerManagerHandler} disabled={Object.keys(curCluster).length>0?curCluster.spec.kubernetes.version>='v1.24.0':true}>
                            Docker
                        </Radio>
                    </Tooltip>
                    <Radio name="containerd" checked={Object.keys(curCluster).length>0?curCluster.spec.kubernetes.containerManager === 'containerd':false} onChange={changeContainerManagerHandler}>
                        Containerd
                    </Radio>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Kubekey命名空间：
                </Column>
                <Column>
                    <Input placeholder="默认为kubekey-system" value={KubekeyNamespace} onChange={changeKubekeyNamespaceHandler} />
                </Column>
            </Columns>
        </div>
    )
};

export default UpgradeClusterSetting;
