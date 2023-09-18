import React, {useEffect, useState} from 'react';
import InputNodeInfoSetting from "./AddNodeSettings/InputNodeInfoSetting";
import ConfirmAddNodeSetting from "./AddNodeSettings/ConfirmAddNodeSetting";
import useAddNodeFormContext from "../../hooks/useAddNodeFormContext";
import useClusterTableContext from "../../hooks/useClusterTableContext";
import AddNodeEtcdSetting from "./AddNodeSettings/AddNodeEtcdSetting";

const AddNodeFormInputs = () => {
    const { page } = useAddNodeFormContext()

    const display = {
        0: <InputNodeInfoSetting/>,
        1: <AddNodeEtcdSetting/>,
        2: <ConfirmAddNodeSetting/>
    }

    return (
        <div>
            {display[page]}
        </div>
    )
};

export default AddNodeFormInputs;
