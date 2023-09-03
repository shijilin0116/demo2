import React from 'react';
import {Column, Columns, Select, Toggle} from "@kube-design/components";
import useFormContext from "../../hooks/useFormContext";

const KubesphereSetting = () => {
    const { data, handleChange } = useFormContext()

    const KubesphereVersionOptions = [
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
    const changeInstallKubesphereHandler = (e) => {
        handleChange('installKubesphere',e)
    }
    const changeKubesphereVersionHandler = e => {
        handleChange('KubesphereVersion',e)
    }

    return (
        <div>
            <Columns>
                <Column className={'is-2'}>是否安装Kubesphere:</Column>
                <Column>
                    <Toggle checked={data.installKubesphere} onChange={changeInstallKubesphereHandler} onText="开启" offText="关闭" />
                </Column>

            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Kubesphere版本：
                </Column>
                <Column>
                    <Select value={data.KubesphereVersion} options={KubesphereVersionOptions} onChange={changeKubesphereVersionHandler} />
                </Column>
            </Columns>
        </div>
    );
};

export default KubesphereSetting;
