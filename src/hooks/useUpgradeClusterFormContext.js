import React, {useContext} from 'react';
import UpgradeClusterFormContext from "../context/UpgradeClusterFormContext";

const UseUpgradeClusterFormContext = () => {
    return useContext(UpgradeClusterFormContext);
};

export default UseUpgradeClusterFormContext;
