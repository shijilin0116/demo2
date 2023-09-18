import React, {createContext, useState} from 'react';

const DeleteNodeFormContext = createContext({})

export const DeleteNodeFormProvider = ({children}) => {
    const [disableButton,setDisableButton] = useState(false)
    const [curCluster,setCurCluster] = useState({});
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const title = {
        0:'选择节点',
        1:'确认删除'
    }
    const [curSelectedNodeName,setCurSelectedNodeName] = useState([])

    const [page,setPage] = useState(0)
    const handleChange = (fieldName, newValue) => {
        console.log('进入handlerchange')
    };

    const canSubmit = true

    const canNextPage0To1 = true
    //
    const canNextPage1To2 = true

    const disablePrev = page === 0
        // || disableButton

    // const allHostHaveRole =

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage0To1)
        || (page === 1 && !canNextPage1To2)

    return (
        <DeleteNodeFormContext.Provider value={{ buttonDisabled,setButtonDisabled, title, page, setPage,disableNext,
            disablePrev, disableButton,setDisableButton, handleChange, canSubmit,curSelectedNodeName,setCurSelectedNodeName,curCluster,setCurCluster}}>
            {children}
        </DeleteNodeFormContext.Provider>
    );
};

export default DeleteNodeFormContext;
