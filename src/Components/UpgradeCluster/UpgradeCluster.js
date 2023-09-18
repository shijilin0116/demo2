import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Column, Columns} from "@kube-design/components";
import DeleteNodeProgressBar from "../DeleteNode/DeleteNodeProgressBar";
import DeleteNodeForm from "../DeleteNode/DeleteNodeForm";
import UpgradeClusterProgressBar from "./UpgradeClusterProgressBar";
import UpgradeClusterForm from "./UpgradeClusterForm";
import useUpgradeClusterFormContext from "../../hooks/useUpgradeClusterFormContext";
import useClusterTableContext from "../../hooks/useClusterTableContext";

const UpgradeCluster = () => {
    const {clusterName} = useParams()
    const {clusterData} = useClusterTableContext()
    const {curCluster,setCurCluster} = useUpgradeClusterFormContext()
    useEffect(() => {
        if (clusterData.length > 0) {
            setCurCluster(clusterData.find(item=>item.metadata.name===clusterName))
        }
    }, [clusterData]);
    return (
        <>
            <Columns>
                <Column className="is-1"></Column>
                <Column className="is-2">
                    <h2>升级集群</h2>
                </Column>
                <Column className={'is-8'}>
                    <Columns>
                        <Column className={'is-10'}>
                        </Column>
                        <Column>
                            <Link to='/'>
                                <Button>集群列表</Button>
                            </Link>
                        </Column>
                    </Columns>
                </Column>
            </Columns>
            <Columns>
                <Column className={'is-1'}></Column>
                <Column className={'is-2'}>
                    <UpgradeClusterProgressBar></UpgradeClusterProgressBar>
                </Column>
                <Column className={'is-8'}>
                    <UpgradeClusterForm/>
                </Column>
            </Columns>
        </>
    );
};

export default UpgradeCluster;
