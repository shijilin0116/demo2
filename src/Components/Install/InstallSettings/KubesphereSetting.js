import React, {useEffect, useState} from 'react';
import {Column, Columns, Select, Toggle, Tooltip} from "@kube-design/components";
import useInstallFormContext from "../../../hooks/useInstallFormContext";

const KubesphereSetting = () => {
    const { data, ksEnable, setKsEnable, ksVersion, setKsVersion} = useInstallFormContext()
    const [KubesphereVersionOptions,setKubesphereVersionOptions] = useState([])

    useEffect(()=>{
        console.log("data.clusterVersion",data.spec.kubernetes.version)
        fetch(`http://localhost:8082/ksVersionOptions/${data.spec.kubernetes.version}`)
        // fetch(`http://139.196.14.61:8082/ksVersionOptions/${data.spec.kubernetes.version}`)
            .then((res)=>{
                return res.json()
            }).then(data => {
            console.log(data.ksVersionOptions)
            setKubesphereVersionOptions(data.ksVersionOptions.map(item => ({ value: item, label: item })))
            console.log(KubesphereVersionOptions)
        }).catch(()=>{

        })

    },[])
    const changeInstallKubesphereHandler = (e) => {
        setKsVersion('')
        setKsEnable(e)
    }
    const changeKubesphereVersionHandler = e => {
        setKsVersion(e)
    }

    return (
        <div>
            <Columns>
                <Column className={'is-2'}>是否安装Kubesphere:</Column>
                <Column>
                    <Tooltip content="安装KubeSphere需要在存储设置中开启本地存储" placement="right" >
                        <Toggle checked={ksEnable} onChange={changeInstallKubesphereHandler} onText="开启" offText="关闭"/>
                        {/*<Toggle checked={ksEnable} onChange={changeInstallKubesphereHandler} onText="开启" offText="关闭" disabled={!data.enableLocalStorage}/>*/}
                    </Tooltip>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Kubesphere版本：
                </Column>
                <Column>
                    <Select placeholder="Kubesphere可选版本与K8s集群版本有关" value={ksVersion} options={KubesphereVersionOptions} disabled={!ksEnable} onChange={changeKubesphereVersionHandler} />
                </Column>
            </Columns>
        </div>
    );
};

export default KubesphereSetting;
