import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import useFormContext from "../../../hooks/useFormContext";

const NodesTableDataWrapper= ({ children }) => {

    const { data, handleChange } = useFormContext()

    const initialData = data.nodes;

    const initialColumns = [
        {
            children: [
                { title: 'Name', dataIndex: 'nodeName', sorter: true, search: true },
                { title: 'Address', dataIndex: 'Address', width: '18%' },
                { title: 'InternalAddress', dataIndex: 'InternalAddress', width: '18%' },
                {
                    title: '角色',
                    dataIndex: 'role',
                    filters: [
                        { text: 'master', value: 'Master' },
                        { text: 'worker', value: 'worker' },
                    ],
                    search: true,
                },
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
    }, []);

    const setSelectedRowKeys = (value) => {
        setList((prevState) => ({ ...prevState, selectedRowKeys: value }));
    };

    const fetchList = ({ name, pagination = {}, filters = {}, sorter = {} } = {}) => {
        setList((prevState) => ({ ...prevState, isLoading: true }));
        setTimeout(() => {
            let data = [...initialData];

            if (name) {
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

export default NodesTableDataWrapper;
