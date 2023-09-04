import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';

const ClusterTableDataWrapper= ({ children }) => {

    const [clusterData,setClusterData] = useState(
        [
            {
                clusterName: 'cluster1',
                nodeNum: 6,
                clusterVersion: 'v1.2',
                KubesphereVersion: 'v2.3',
                autoRenewCert: true,
            },
            {
                clusterName: 'cluster2',
                nodeNum: 3,
                clusterVersion: 'v1.2',
                KubesphereVersion: 'v2.3',
                autoRenewCert: true,
            },
            {
                clusterName: 'cluster3',
                nodeNum: 7,
                clusterVersion: 'v1.2',
                KubesphereVersion: 'v2.3',
                autoRenewCert: true,
            },
        ]
    )

    const initialColumns = [
        {
            children: [
                { title: 'Name', dataIndex: 'clusterName', sorter: true, search: true },
                { title: '节点数', dataIndex: 'nodeNum', width: '18%' },
                { title: 'Kubernetes版本', dataIndex: 'clusterVersion', width: '18%' },
                {
                    title: '自动续费证书',
                    dataIndex: 'autoRenewCert',
                    filters: [
                        { text: '是', value: true },
                        { text: '否', value: false },
                    ],
                    search: true,
                },
                {title: 'Kubesphere版本', dataIndex: 'KubesphereVersion', width: '18%'},

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
