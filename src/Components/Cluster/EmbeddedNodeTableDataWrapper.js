import React, { useState, useEffect } from 'react';
import { sortBy } from 'lodash';
import useInstallFormContext from "../../hooks/useInstallFormContext";
import {Add, Stop, Pen, Trash, More} from "@kubed/icons";
import {Tag} from "@kube-design/components";
import HostEditModal from "../Modal/HostEditModal";
import HostDeleteConfirmModal from "../Modal/HostDeleteConfirmModal";
import {Button, Dropdown, Menu, MenuItem, MenuLabel} from "@kubed/components";
import HostDeleteByConfigModal from "../Modal/HostDeleteByConfigModal";
const EmbeddedNodeTableDataWrapper= ({ children,curClusterData }) => {

    const {data} = useInstallFormContext()

    const  initialData = curClusterData.spec.hosts
    console.log('initialData')
    console.log(initialData)
    // const menuColumn = (_,record) => {
    //     // console.log(record)
    //     return (
    //         <div style={{display: `flex`}}>
    //             {/*有bug*/}
    //             {/*<HostEditModal record={record}/>*/}
    //             {/*<HostDeleteConfirmModal record={record}/>*/}
    //         </div>
    //     )
    // }
    // const menuColumn = (_,record) => {
    //     const MenuComponent = (
    //         <Menu>
    //             <MenuLabel>menu label</MenuLabel>
    //             <MenuItem icon={<Add />}>创建</MenuItem>
    //             {/*<MenuItem icon={<Stop />}>停止调度</MenuItem>*/}
    //             {/*<MenuItem icon={<Pen />}>Edit</MenuItem>*/}
    //             <MenuItem icon={<Trash />}>删除节点</MenuItem>
    //         </Menu>
    //     );
    //     return (
    //         <div>
    //             <Dropdown content={MenuComponent}>
    //                 <Button variant="text" radius="lg">
    //                     <More size={16} />
    //                 </Button>
    //             </Dropdown>
    //         </div>
    //     )
    // }

    // const menuColumn = (_,record) => {
    //     return <HostDeleteByConfigModal record={record} curClusterData={curClusterData}/>
    // }
    const roleColumn = (_,record) => {
        return(
            <div style={{display: `flex`}}>
                {curClusterData.spec.roleGroups.master.includes(record.name) && <Tag type="warning">MASTER</Tag>}
                {curClusterData.spec.roleGroups.master.includes(record.name) && <div style={{width:'10px'}}/>}
                {curClusterData.spec.roleGroups.worker.includes(record.name) && <Tag type="primary">WORKER</Tag>}
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
                    // filters: [
                    //     { text: 'MASTER', value: 'Master' },
                    //     { text: 'WORKER', value: ['Worker'] },
                    // ],
                    search: true,
                    render:roleColumn
                },
                // {title:'操作', dataIndex:'', width: '8%', render:menuColumn}

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
    }, [curClusterData.spec.hosts]);

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
            const { page = 1, limit = 5 } = pagination;
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

export default EmbeddedNodeTableDataWrapper;
