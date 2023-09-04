import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import useFormContext from "../../../hooks/useFormContext";

import {Tag} from "@kube-design/components";
import NodeEditModal from "../../Modal/NodeEditModal";
import NodeDeleteConfirmModal from "../../Modal/NodeDeleteConfirmModal";
const NodesTableDataWrapper= ({ children }) => {

    const {data} = useFormContext()

    const initialData = data.nodes;

    const menuColumn = (record) => {
        // console.log(record)
        return (
            <div style={{display: `flex`}}>
                <NodeEditModal record={record}/>
                <NodeDeleteConfirmModal record={record}/>
            </div>
        )
    }
    const roleColumn = (record) => {
        return(
            <div style={{display: `flex`}}>
                <div style={{marginRight:'10px'}}>
                    {record.role.includes('Master') && <Tag type="warning">MASTER</Tag>}
                </div>
                <div>
                    {record.role.includes('Worker') && <Tag type="primary">WORKER</Tag>}
                </div>
            </div>
        )
    }
    const initialColumns = [
        {
            children: [
                { title: 'Name', dataIndex: 'nodeName', sorter: true, search: true },
                { title: 'Address', dataIndex: 'Address', width: '15%' },
                { title: 'InternalAddress', dataIndex: 'InternalAddress', width: '15%' },
                {
                    title: '角色',
                    dataIndex: 'role',
                    width: '20%',
                    filters: [
                        { text: 'MASTER', value: 'Master' },
                        { text: 'WORKER', value: ['Worker'] },
                    ],
                    search: true,
                    render:(_,record) => roleColumn(record)
                },
                {title:'操作', dataIndex:'', width: '13%', render:(_,record) => menuColumn(record)}

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
    }, [data.nodes]);

    const setSelectedRowKeys = (value) => {
        setList((prevState) => ({ ...prevState, selectedRowKeys: value }));
    };

    const fetchList = ({ name, pagination = {}, filters = {}, sorter = {} } = {}) => {
        setList((prevState) => ({ ...prevState, isLoading: true }));
        setTimeout(() => {
            let data = [...initialData];

            if (name) {
                console.log(1111111)
                console.log(name)
                data = data.filter((item) => item.nodeName.indexOf(name) !== -1);
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

export default NodesTableDataWrapper;
