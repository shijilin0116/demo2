import React from 'react';
import useFormContext from "../../hooks/useFormContext";
import {Column, Input, Columns, Select, Tag, RadioGroup} from "@kube-design/components";

const EtcdSetting = () => {
    const { data, handleChange } = useFormContext()
    const ETCDOptions = data.nodes.map(node => ({
        value: node.nodeName,
        label: node.nodeName
    }));

    const ETCDTypeOptions = [{
        value: 'kubekey',
        label: 'kubekey'
    }]

    // const ETCDOptionContent = (item) => {
    //     return (
    //         <Select.Option key={item.nodeName} value={item.nodeName} label={item.nodeName}>
    //             <div>{item.nodeName}</div>
    //             <div>
    //                 {item.role.includes('Master') && <Tag color="error">MASTER</Tag>}
    //                 {item.role.includes('Worker') && <Tag color="secondary">WORKER</Tag>}
    //             </div>
    //         </Select.Option>
    //     )
    // }
    const ETCDChangeHandler = (e) => {
        handleChange('ETCD',e)
    }
    const ETCDTypeChangeHandler = e => {
        handleChange('ETCDType',e)
    }
    const content = (
        <div>
            <Columns>
                <Column className={'is-2'}>ETCD部署节点：</Column>
                <Column>
                    <Select options={ETCDOptions} value={data.ETCD} onChange={ETCDChangeHandler} searchable multi />
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>ETCD类型：</Column>
                <Column >
                    <RadioGroup options={ETCDTypeOptions} value={data.ETCDType} onChange={ETCDTypeChangeHandler} />
                </Column>
            </Columns>
        </div>
    )

    return content
};

export default EtcdSetting;
