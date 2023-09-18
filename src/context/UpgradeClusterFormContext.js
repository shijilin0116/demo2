import React, {createContext, useState} from 'react';
import DeleteNodeFormContext from "./DeleteNodeFormContext";

const UpgradeClusterFormContext = createContext({})
export const UpgradeClusterFormProvider = ({children})=> {
    const [disableButton,setDisableButton] = useState(false)
    const [curCluster,setCurCluster] = useState({});
    const [buttonDisabled,setButtonDisabled] = useState(false)
    const title = {
        0:'集群设置',
        1:'镜像仓库设置',
        2:'Kubesphere设置',
        3:'存储设置',
        4:'确认升级'
    }

    const [KubekeyNamespace, setKubekeyNamespace] = useState('kubekey-system')
    const [page,setPage] = useState(0)
    const [ksVersion,setKsVersion] = useState('v3.4.0')
    const [ksEnable,setKsEnable] = useState(true)
    const canSubmit = true

    const canNextPage0To1 = true
    //
    const canNextPage1To2 = true

    const disablePrev = page === 0
    // || disableButton

    const handleChange = (fieldName, newValue) => {
        console.log('进入handlerchange')
        console.log(newValue)
        setCurCluster(prevState => {
            if(fieldName==='') {
                return {...prevState, newValue}
            } else {
                const updatedData = { ...prevState };
                // 使用字段名拆分成多级属性
                const fieldNames = fieldName.split('.');
                let currentField = updatedData;
                // 遍历字段名的每一级
                for (let i = 0; i < fieldNames.length; i++) {
                    const name = fieldNames[i];

                    // 如果是最后一级属性，直接更新其值
                    if (i === fieldNames.length - 1) {
                        currentField[name] = newValue;
                    } else {
                        // 如果不是最后一级属性，确保属性存在并进入下一级
                        if (!currentField[name]) {
                            currentField[name] = {};
                        }
                        currentField = currentField[name];
                    }
                }
                console.log('改后的updatedData is',updatedData)
                return updatedData
            }
        });
    };

    // const allHostHaveRole =

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage0To1)
        || (page === 1 && !canNextPage1To2)

    return (
        <UpgradeClusterFormContext.Provider value={{ ksVersion,setKsVersion,ksEnable,setKsEnable,buttonDisabled,setButtonDisabled, title, page, setPage,disableNext,
            disablePrev, disableButton,setDisableButton, handleChange, canSubmit,curCluster,setCurCluster,KubekeyNamespace, setKubekeyNamespace}}>
            {children}
        </UpgradeClusterFormContext.Provider>
    );
};
export default UpgradeClusterFormContext;
