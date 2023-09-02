import {createContext, useState} from "react";

const FormContext = createContext({})

export const FormProvider = ({children}) => {
    const title = {
        0:'主机设置',
        1:'ETCD设置',
        2:'集群设置',
        3:'网络设置',
        4:'存储设置',
        5:'镜像仓库设置',
        6:'Kubesphere设置',
        7:'安装'
    }
    const [page,setPage] = useState(0)

    const [data, setData] = useState({
        nodes:[{
            id :'1',
            nodeName : 'node1',
            Address : '192.168.6.2',
            InternalAddress : '192.168.6.2',
            role : ['Master','Worker'],
            userName : 'root',
            password : '123456'
        },
            {
                id :'2',
                nodeName : 'node2',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456'
            },
            {
                id :'3',
                nodeName : 'node3',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456'
            }],
        ETCD:[],
        ETCDType:'kubekey',
        clusterName : '',
        clusterVersion : '',
        containerManager : 'docker',
        autoRenewCert : true,
        networkPlugin:'',
        kubePodsCIDR:'10.233.64.0/18',
        kubeServiceCIDR:'10.233.64.0/18',
        enableMultusCNI: false,
        enableLocalStorage:false,
        usePrivateRegistry:false,
        privateRegistryUrl:'',
        namespaceOverride:'',
        registryMirrors:[],
        insecureRegistries:[],
        installKubesphere : true,
        KubesphereVersion:''

    })

    const handleChange = (key,value) => {
        // console.log(e)
        // console.log(data)
        // const type = e.target.type
        // const name = e.target.name
        // const value = type === "checkbox"
        //     ? e.target.checked
        //     : e.target.value
        setData(prevData => ({
            ...prevData,[key]:value
        }) )
        console.log(data)
    }

    const {
        ...requiredInputs } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(title).length - 1

    const canNextPage1 = true
        // Object.keys(data)
        // .filter(key => key.startsWith('bill') && key !== 'billAddress2')
        // .map(key => data[key])
        // .every(Boolean)

    const canNextPage2 = true
        // Object.keys(data)
        // .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
        // .map(key => data[key])
        // .every(Boolean)

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)

    const prevHide = page === 0 && "remove-button"

    const nextHide = page === Object.keys(title).length - 1 && "remove-button"

    const submitHide = page !== Object.keys(title).length - 1 && "remove-button"

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext, prevHide, nextHide, submitHide }}>
            {children}
        </FormContext.Provider>
    )
}
export default FormContext
