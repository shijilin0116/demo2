import React from 'react';
import AddNodeTable from "./AddNodeTable";
import AddNodeModal from "../../Modal/AddNodeModal";
import useAddNodeFormContext from "../../../hooks/useAddNodeFormContext";

const InputNodeInfoSetting = () => {
    return (
        <div>
            <AddNodeModal ></AddNodeModal>
            <AddNodeTable />
        </div>
    );
};

export default InputNodeInfoSetting;
