import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import useInstallFormContext from "../../../hooks/useInstallFormContext";

import {Tag} from "@kube-design/components";
import HostEditModal from "../../Modal/HostEditModal";
import HostDeleteConfirmModal from "../../Modal/HostDeleteConfirmModal";
const HostTableDataWrapper= ({ children }) => {

    const {data} = useInstallFormContext()

    const initialData = data.spec.hosts;

    const menuColumn = (_,record) => {
        // console.log(record)
        return (
            <div style={{display: `flex`}}>
                <HostEditModal record={record}/>
                <HostDeleteConfirmModal record={record}/>
            </div>
        )
    }
    const roleColumn = (_,record) => {
        return(
            <div style={{display: `flex`}}>
                {data.spec.roleGroups.master.includes(record.name) && <Tag type="warning">MASTER</Tag>}
                {data.spec.roleGroups.master.includes(record.name) && <div style={{width:'10px'}}/>}
                {data.spec.roleGroups.worker.includes(record.name) && <Tag type="primary">WORKER</Tag>}
            </div>
        )
    }
    const initialColumns = [
        {
            children: [
                { title: 'Name', dataIndex: 'name', sorter: true, search: true },
                { title: 'Address', dataIndex: 'address', width: '15%' },
                { title: 'InternalAddress', dataIndex: 'internalAddress', width: '15%' },
                {
                    title: '角色',
                    dataIndex: 'role',
                    width: '20%',
                    search: true,
                    render:roleColumn
                },
                {title:'操作', dataIndex:'', width: '13%', render:menuColumn}

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
    }, [data.spec.hosts]);

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
                data = data.filter((item) => item.name.indexOf(name) !== -1);
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

export default HostTableDataWrapper;
