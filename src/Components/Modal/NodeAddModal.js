import React from 'react';
// import {Button} from "@kube-design/components";
import {useModal} from "@kubed/components";
import {Checkbox, CheckboxGroup, Column, Columns, Input, InputPassword, Button} from "@kube-design/components";
const NodeAddModal = () => {
    const modal = useModal();

    const roleOptions = [
        {
            value:'Master',
            label:'Master'
        },
        {
            value:'Worker',
            label:'Worker'
        }
    ]
    // const content = <Button onClick={openChildModal}>Nest Imperative Modal</Button>;
    const content = (
        <div>
            <Columns>
                <Column className={'is-2'}>
                    主机名：
                </Column>
                <Column>
                    <Input></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Address：
                </Column>
                <Column>
                    <Input></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    InternalAddress：
                </Column>
                <Column>
                    <Input></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    角色：
                </Column>
                <Column>
                    <CheckboxGroup options={roleOptions} ></CheckboxGroup>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    用户名：
                </Column>
                <Column>
                    <Input></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    密码：
                </Column>
                <Column>
                    <InputPassword></InputPassword>
                </Column>
            </Columns>

        </div>
    )



    const openModal = () => {
        modal.open({
            title: '添加节点',
            content,
        });
    };

    return <Button icon="add" onClick={openModal}>添加节点</Button>;
}

export default NodeAddModal;
