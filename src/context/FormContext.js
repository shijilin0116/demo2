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
            nodeName : 'node1',
            Address : '192.168.6.2',
            InternalAddress : '192.168.6.2',
            role : ['Master','Worker'],
            userName : 'root',
            password : '123456',
            sshFilePath: '/var/root/.ssh/id_rsa'
        },
            {
                nodeName : 'node2',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456',
                sshFilePath: '/var/root/.ssh/id_rsa'
            },
            {
                // id :'3',
                nodeName : 'node3',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456',
                sshFilePath: '/var/root/.ssh/id_rsa'
            },
            {
                // id :'3',
                nodeName : 'node4',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456',
                sshFilePath: '/var/root/.ssh/id_rsa'
            },
            {
                // id :'3',
                nodeName : 'node5',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456',
                sshFilePath: '/var/root/.ssh/id_rsa'
            },
            {
                // id :'3',
                nodeName : 'node6',
                Address : '192.168.6.2',
                InternalAddress : '192.168.6.2',
                role : ['Worker'],
                userName : 'root',
                password : '123456',
                sshFilePath: '/var/root/.ssh/id_rsa'
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
        // namespaceOverride:'234',
        registryMirrors:[],
        insecureRegistries:[],
        installKubesphere : true,
        KubesphereVersion:'',
        KubekeyNamespace: 'kubekey-system',
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
        nodes,
        ETCD,
        autoRenewCert,
        enableLocalStorage,
        enableMultusCNI,
        installKubesphere,
        usePrivateRegistry,
        registryMirrors,
        insecureRegistries,
        privateRegistryUrl,
        ...requiredInputs } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean)
                        && nodes.length>0
                        &&ETCD.length>0
                        && page === Object.keys(title).length - 1
                        && (!data.usePrivateRegistry || (data.usePrivateRegistry && data.privateRegistryUrl!==''))

    const canNextPage0To1 = nodes.length>0

    const canNextPage1To2 = ETCD.length>0 && data.ETCDType !== ''

    const canNextPage2To3 = data.clusterName !== '' && data.clusterVersion !== '' && data.containerManager !== '' && data.KubekeyNamespace !== ''

    const canNextPage3To4 = data.networkPlugin !=='' && data.kubePodsCIDR !=='' && data.kubeServiceCIDR !== ''
        // Object.keys(data)
        // .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
        // .map(key => data[key])
        // .every(Boolean)
    // const canNextPage4To5 = true

    const canNextPage5To6 = !data.usePrivateRegistry || (data.usePrivateRegistry && data.privateRegistryUrl!=='')

    const canNextPage6To7 = data.KubesphereVersion !== ''

    // const canToPageI=[
    //     canNextPage0To1,
    //     canNextPage1To2,
    //     canNextPage2To3,
    //     canNextPage3To4,
    //     canNextPage4To5,
    //     canNextPage5To6,
    //     canNextPage6To7
    // ]
    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage0To1)
        || (page === 1 && !canNextPage1To2)
        || (page === 2 && !canNextPage2To3)
        || (page === 3 && !canNextPage3To4)
        || (page === 5 && !canNextPage5To6)
        || (page === 6 && !canNextPage6To7)

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext}}>
            {children}
        </FormContext.Provider>
    )
}
export default FormContext
