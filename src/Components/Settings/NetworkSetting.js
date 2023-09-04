import React from 'react';
import useFormContext from "../../hooks/useFormContext";
import {Column, Input, RadioGroup, Columns, Toggle, Tooltip} from "@kube-design/components";

const NetworkSetting = () => {
    const networkPluginOptions = [
        {
            value:'calico',
            label:'calico'
        }, {
            value:'flannel',
            label:'flannel'
        },{
            value:'cilium',
            label:'cilium'
        },
        {
            value:'hybridnet',
            label:'hybridnet'
        },
        {
            value:'Kube-OVN',
            label:'Kube-OVN'
        },
        {
            value:'none',
            label:'不启用'
        }
    ]

    const { data, handleChange } = useFormContext()
    const networkPluginChangeHandler = (e) => {
        handleChange('networkPlugin',e)
    }
    const kubePodsCIDRParts = data.kubePodsCIDR.split('/')
    const kubePodsCIDRIPArray = kubePodsCIDRParts[0].split('.');
    const kubePodsCIDRPrefix = kubePodsCIDRParts[1]

    const  kubePodsCIDRChangeHandler = (e) => {
        if (e.target.name === 'kubePodsCIDRPrefix') {
            handleChange('kubePodsCIDR',kubePodsCIDRIPArray.join('.') + '/' + e.target.value)

        } else {
            kubePodsCIDRIPArray[+e.target.id]=e.target.value
            handleChange('kubePodsCIDR',kubePodsCIDRIPArray.join('.') + '/'+kubePodsCIDRPrefix)
        }
    }

    const kubeServiceCIDRParts = data.kubeServiceCIDR.split('/')
    const kubeServiceCIDRIPArray = kubeServiceCIDRParts[0].split('.');
    const kubeServiceCIDRPrefix = kubeServiceCIDRParts[1]

    const  kubeServiceCIDRChangeHandler = (e) => {
        if (e.target.name === 'kubeServiceCIDRPrefix') {
            handleChange('kubeServiceCIDR',kubeServiceCIDRIPArray.join('.') + '/' + e.target.value)

        } else {
            kubeServiceCIDRIPArray[+e.target.id]=e.target.value
            handleChange('kubeServiceCIDR',kubeServiceCIDRIPArray.join('.') + '/'+kubeServiceCIDRPrefix)
        }
    }

    const changEnableMultusCNIHandler = e => {
        handleChange('enableMultusCNI',e)
    }

    return (

        <div>
            <Columns>
                <Column className={'is-2'}>网络插件：</Column>
                <Column>
                    <RadioGroup value={data.networkPlugin} options={networkPluginOptions} onChange={networkPluginChangeHandler}>
                    </RadioGroup>
                </Column>
            </Columns>
            <Columns >
                <Column className={'is-2'}>kubePodsCIDR:</Column>
                <Column>
                    {kubePodsCIDRIPArray.map((item,index)=><Input id={index} value={item} onChange={kubePodsCIDRChangeHandler}/>)}
                    <Input name='kubePodsCIDRPrefix' value={kubePodsCIDRPrefix}  onChange={kubePodsCIDRChangeHandler}/>
                </Column>
            </Columns>
            <Columns >
                <Column className={'is-2'}>kubeServiceCIDR:</Column>
                <Column>
                    {kubeServiceCIDRIPArray.map((item,index)=><Input id={index} value={item} onChange={kubeServiceCIDRChangeHandler}/>)}
                    <Input name='kubeServiceCIDRPrefix' value={kubeServiceCIDRPrefix}  onChange={kubeServiceCIDRChangeHandler}/>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>是否开启Multus CNI:</Column>
                <Column>
                    <Tooltip content="Multus 不能独立部署。它总是需要至少一个传统的 CNI 插件，以满足 Kubernetes 集群的网络要求。该 CNI 插件成为 Multus 的默认插件，并将被用来为所有的 pod 提供主接口。">
                        <Toggle checked={data.enableMultusCNI} onChange={changEnableMultusCNIHandler} onText="开启" offText="关闭" disabled={data.networkPlugin==='none' || data.networkPlugin===''}/>
                    </Tooltip>
                </Column>
            </Columns>
        </div>
    );
};

export default NetworkSetting;
