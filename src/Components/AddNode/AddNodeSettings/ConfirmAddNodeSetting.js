import React, {useEffect, useState} from 'react';
import useAddNodeFormContext from "../../../hooks/useAddNodeFormContext";

const ConfirmAddNodeSetting = ({clusterName}) => {
    const {curCluster} = useAddNodeFormContext()
    console.log(curCluster.spec.hosts)
    return (
        <div>
            我是AddNodeSetting

        </div>
    );
};

export default ConfirmAddNodeSetting;
