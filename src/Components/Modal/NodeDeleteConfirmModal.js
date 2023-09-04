import React from 'react';
import {Button, Modal} from "@kubed/components";
import useFormContext from "../../hooks/useFormContext";
import {Column, Columns} from "@kube-design/components";


const NodeDeleteConfirmModal = ({record}) => {

    const { data, handleChange } = useFormContext()

    const [visible, setVisible] = React.useState(false);


    const ref = React.createRef();
    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        setVisible(false);
    };

    const onOKHandler = () => {
        const newNodes = data.nodes.filter(node => node.nodeName !== record.nodeName);
        handleChange('nodes',newNodes)
        setVisible(false);
    }

    const textStyle={
        fontSize:"20px",
        height: '30px',
        margin: 0, /* 清除默认的外边距 */
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div>
            <Button variant="link" onClick={openModal}>删除</Button>
            <Modal
                ref={ref}
                visible={visible}
                title="删除节点"
                onCancel={closeModal}
                onOk={onOKHandler}
            >
                <Columns>
                    <Column className='is-1'></Column>
                    <Column style={{display:`flex`, alignItems: 'center' }}>
                        <p style={textStyle}>确定删除吗？</p>
                    </Column>
                </Columns>
            </Modal>
        </div>
    );
};

export default NodeDeleteConfirmModal;
