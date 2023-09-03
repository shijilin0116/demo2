import React from 'react';
import NodesTable from "./NodesTable";
import NodeAddModal from "../../Modal/NodeAddModal";

const NodeSetting = () => {

    return (
        <div>
        <NodeAddModal></NodeAddModal>
        <NodesTable></NodesTable>
    </div>
    )
};

export default NodeSetting;
