import React from 'react';
import HostTable from "../../../Install/InstallSettings/HostSetting/HostTable";
import DeleteNodeTable from "./DeleteNodeTable";
import {ClusterTableProvider} from "../../../../context/ClusterTableContext";
import {DeleteNodeFormProvider} from "../../../../context/DeleteNodeFormContext";

const SelectNodeSetting = () => {
    return (
        <div>
            <DeleteNodeTable></DeleteNodeTable>
        </div>
    );
};

export default SelectNodeSetting;
