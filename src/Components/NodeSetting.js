import React from 'react';
import useFormContext from "../hooks/useFormContext";
import {Input} from "@kubed/components";

const NodeSetting = () => {
    const { data, handleChange } = useFormContext()

    const content = (
        <Input name="clusterName" value={data.clusterName} onChange={handleChange}/>
    )

    return content
};

export default NodeSetting;
