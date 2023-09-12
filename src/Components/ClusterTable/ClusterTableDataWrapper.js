import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import {Tag} from "@kube-design/components";

const ClusterTableDataWrapper= ({ children,clusterData }) => {



    const autoRenewCertColumn = (_,record) => {
        return(
            <div style={{display: `flex`}}>
                {record.autoRenewCert && <div>是</div>}
                {!record.autoRenewCert && <div>否</div>}
            </div>
        )
    }


    const initialColumns = [
        {
            children: [
                { title: 'Name',  width: '14%',dataIndex: 'clusterName', sorter: true, search: true },
                { title: '节点数', width: '8%',render:(_, record) => record.nodes.length},
                { title: 'Kubernetes 版本', dataIndex: 'clusterVersion', width: '18%' },
                {
                    title: '自动续费证书',
                    width: '14%',
                    dataIndex: 'autoRenewCert',
                    filters: [
                        { text: '是', value: true },
                        { text: '否', value: false },
                    ],
                    search: true,
                    render:autoRenewCertColumn
                },
                {title: 'KubeSphere 版本', dataIndex: 'KubesphereVersion', width: '14%'},
                {title: '网络插件', dataIndex: 'networkPlugin', width: '18%'},
                {title: '容器运行时', dataIndex: 'containerManager', width: '18%'},
            ],
        },
    ];

    const [list, setList] = useState({
        data: [],
        isLoading: false,
        selectedRowKeys: [],
        filters: {},
        sorter: {},
        pagination: { page: 1, total: 0, limit: 10 },
    });

    useEffect(() => {
        fetchList();
    }, [clusterData]);

    const setSelectedRowKeys = (value) => {
        setList((prevState) => ({ ...prevState, selectedRowKeys: value }));
    };

    const fetchList = ({ name, pagination = {}, filters = {}, sorter = {} } = {}) => {
        setList((prevState) => ({ ...prevState, isLoading: true }));
        setTimeout(() => {
            let data = [...clusterData];

            if (name) {
                data = data.filter((item) => item.clusterName.indexOf(name) !== -1);
            }

            const filterKeys = Object.keys(filters);
            if (filterKeys.length > 0) {
                data = data.filter((item) =>
                    filterKeys.every((key) => filters[key] === item[key])
                );
            }

            if (sorter.field && sorter.order) {
                data = sortBy(data, [sorter.field]);
                if (sorter.order === 'descend') {
                    data = data.reverse();
                }
            }

            const total = data.length;
            const { page = 1, limit = 10 } = pagination;
            data = data.slice((page - 1) * limit, page * limit);

            setList({
                data,
                filters,
                sorter,
                pagination: { total, page, limit },
                isLoading: false,
            });
        }, 300);
    };

    return (
        <div>
            {children({
                list,
                columns: initialColumns,
                fetchList,
                setSelectedRowKeys,
            })}
        </div>
    );
}

export default ClusterTableDataWrapper;
