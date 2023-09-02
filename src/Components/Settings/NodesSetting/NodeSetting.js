import React from 'react';
import useFormContext from "../../../hooks/useFormContext";
import {Button, Input} from "@kube-design/components";
import NodesTable from "./NodesTable";
import {Modal, useModal} from "@kubed/components"
import NodeAddModal from "../../Modal/NodeAddModal";

const NodeSetting = () => {
    const { data, handleChange } = useFormContext()

    const [visible, setVisible] = React.useState(false);
    const ref = React.createRef();

    const openModal = () => {
        setVisible(true);
    };

    const closeModal = () => {
        console.log(ref.current);
        setVisible(false);
    };

    const modalContent = <Input></Input>

    const content = (
        <div>
            <NodeAddModal></NodeAddModal>
            <NodesTable></NodesTable>
        </div>
    )

    return content
};

export default NodeSetting;
