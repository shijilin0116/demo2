import React, {useState} from 'react';
// import {Button} from "@kube-design/components";
import {Modal, useModal} from "@kubed/components";
import { CheckboxGroup, Column, Columns, Input, InputPassword, Button} from "@kube-design/components";
import useFormContext from "../../hooks/useFormContext";
const NodeAddModal = () => {
    const { data, handleChange } = useFormContext()

    const [visible, setVisible] = React.useState(false);

    const [newNode,setNewNode] = useState({
        nodeName : '',
        Address : '',
        InternalAddress : '',
        role : [],
        userName : '',
        password : ''
    })

    const ref = React.createRef();
    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setNewNode({
            nodeName : '',
            Address : '',
            InternalAddress : '',
            role : [],
            userName : '',
            password : ''
        })
        setVisible(false);
    };
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
    const onChangeHandler = e => {
        console.log(e)
        if(Array.isArray(e)) {
            setNewNode(prevState => {
                return ({...prevState, role: e})
            })
        } else {
            setNewNode(prevState => {
                return ({...prevState,[e.target.name]:e.target.value})
            })

        }
    }
    const onOKHandler = () => {
        handleChange('nodes',[...data.nodes,newNode])
        setNewNode({
            nodeName : '',
            Address : '',
            InternalAddress : '',
            role : [],
            userName : '',
            password : ''
        })
        setVisible(false);
    }
    const modalContent = (
        <div>
            <Columns>
                <Column className={'is-2'}>
                    主机名：
                </Column>
                <Column>
                    <Input name='nodeName' value={newNode.nodeName} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Address：
                </Column>
                <Column>
                    <Input name='Address' value={newNode.Address} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    InternalAddress：
                </Column>
                <Column>
                    <Input name='InternalAddress' value={newNode.InternalAddress} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    角色：
                </Column>
                <Column>
                    <CheckboxGroup name='role' value={newNode.role} options={roleOptions} onChange={onChangeHandler} ></CheckboxGroup>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    用户名：
                </Column>
                <Column>
                    <Input name='userName' value={newNode.userName} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    密码：
                </Column>
                <Column>
                    <InputPassword name='password' value={newNode.password} onChange={onChangeHandler}></InputPassword>
                </Column>
            </Columns>

        </div>
    )

    return (
        <>
            <Button onClick={openModal}>添加节点</Button>
            <Modal
                ref={ref}
                visible={visible}
                title="添加节点"
                onCancel={closeModal}
                onOk={onOKHandler}
            >
                {modalContent}
            </Modal>
        </>
    );
}

export default NodeAddModal;
