import React, {useState} from 'react';
import useFormContext from "../../hooks/useFormContext";
import {CheckboxGroup, Column, Columns, Input, InputPassword} from "@kube-design/components";
import {Modal,Button} from "@kubed/components";

const NodeEditModal = ({record}) => {
    const recordCopy = record

    const { data, handleChange } = useFormContext()

    const [visible, setVisible] = React.useState(false);

    const [curNode,setCurNode] = useState(record)

    const ref = React.createRef();
    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        //TODO
        setCurNode(recordCopy)
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
        // console.log(e)
        if(Array.isArray(e)) {
            setCurNode(prevState => {
                return ({...prevState, role: e})
            })
        } else {
            setCurNode(prevState => {
                // console.log({...prevState,[e.target.name]:e.target.value})
                return ({...prevState,[e.target.name]:e.target.value})
            })
        }
    }
    const onOKHandler = () => {
        const newNodes = data.nodes.map(node => {
            if (node.nodeName === recordCopy.nodeName) {
                return curNode;
            } else {
                return node;
            }
        });
        handleChange('nodes',newNodes)
        setVisible(false);
    }
    const modalContent = (
        <div>
            <Columns>
                <Column className={'is-2'}>
                    主机名：
                </Column>
                <Column>
                    <Input name='nodeName' value={curNode.nodeName} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    Address：
                </Column>
                <Column>
                    <Input name='Address' value={curNode.Address} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    InternalAddress：
                </Column>
                <Column>
                    <Input name='InternalAddress' value={curNode.InternalAddress} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    角色：
                </Column>
                <Column>
                    <CheckboxGroup name='role' value={curNode.role} options={roleOptions} onChange={onChangeHandler} ></CheckboxGroup>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    用户名：
                </Column>
                <Column>
                    <Input name='userName' value={curNode.userName} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    密码：
                </Column>
                <Column>
                    <InputPassword name='password' value={curNode.password} onChange={onChangeHandler}></InputPassword>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-2'}>
                    id_rsa路径：
                </Column>
                <Column>
                    <Input name='sshFilePath' value={curNode.sshFilePath} onChange={onChangeHandler}></Input>
                </Column>
            </Columns>

        </div>
    )

    return (
        <>
            <Button variant="link" style={{marginRight:'20px'}} onClick={openModal}>编辑</Button>
            <Modal
                ref={ref}
                visible={visible}
                title="编辑节点"
                onCancel={closeModal}
                onOk={onOKHandler}
            >
                {modalContent}
            </Modal>
        </>
    );
}

export default NodeEditModal;
