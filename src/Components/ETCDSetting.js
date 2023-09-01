import React from 'react';
import useFormContext from "../hooks/useFormContext";
import {Col, Input, Row, Select, Tag} from "@kubed/components";

const EtcdSetting = () => {
    const { data, handleChange } = useFormContext()
    const ETCDOptionContent = (item) => {
        return (
            <Select.Option key={item.nodeName} value={item.nodeName} label={item.nodeName}>
                <div>{item.nodeName}</div>
                <div>
                    {item.role.includes('Master') && <Tag color="error">MASTER</Tag>}
                    {item.role.includes('Worker') && <Tag color="secondary">WORKER</Tag>}
                </div>
            </Select.Option>
        )
    }
    const changeHandler = (e) => {
        handleChange()
    }
    const content = (
        <div>
            <Input name="clusterName" value={data.clusterName} onChange={handleChange}/>
            <Row columns={24}>
                <Col span={3}>ETCD部署节点：</Col>
                <Col span={21}>
                    <Select style={{ width:'100%'}} value={data.ETCD} onChange={handleChange} style={{minWidth:400}} placeholder="请选择" allowClear mode="multiple" showArrow optionLabelProp="label">
                        {data.nodes.map(item=>ETCDOptionContent(item))}
                    </Select>
                </Col>
            </Row>
            {/*<Row columns={24}>*/}
            {/*    <Col span={3}>ETCD类型：</Col>*/}
            {/*    <Col span={21}>*/}
            {/*        <Select style={{ width:'100%'}} defaultValue={'kubekey'} style={{minWidth:400}} >*/}
            {/*            <Select.Option value={'kubekey'}>kubekey</Select.Option>*/}
            {/*        </Select>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>

    )

    return content
};

export default EtcdSetting;
