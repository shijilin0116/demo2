import React, {useEffect, useState} from 'react';
import useDeleteNodeFormContext from "../../hooks/useDeleteNodeFormContext";
import SelectNodeSetting from "./DeleteNodeSettings/SelectNodeSetting/SelectNodeSetting";
import ConfirmDeleteNodeSetting from "./DeleteNodeSettings/ConfirmDeleteNodeSetting";
import {ClusterTableProvider} from "../../context/ClusterTableContext";
import useClusterTableContext from "../../hooks/useClusterTableContext";

const DeleteNodeFormInputs = () => {
    const { page } = useDeleteNodeFormContext()

    const display = {
        0: <SelectNodeSetting />,
        1: <ConfirmDeleteNodeSetting />
    }

    return (
        <div>
            {display[page]}
        </div>
    )
};

export default DeleteNodeFormInputs;
