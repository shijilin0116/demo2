import {createContext, useState} from "react";

const ClusterTableContext = createContext({})

export const ClusterTableProvider = ({children}) => {
    const [clusterData,setClusterData] = useState(
        [
            {
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
                clusterName : 'test',
                clusterVersion : 'v1.23.1',
                containerManager : 'docker',
                autoRenewCert : true,
                networkPlugin:'docker',
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
                KubesphereVersion:'v3.4.1',
                KubekeyNamespace: 'kubekey-system',
            },
            {
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
                clusterName : 'test2',
                clusterVersion : 'v1.23.1',
                containerManager : 'docker',
                autoRenewCert : true,
                networkPlugin:'calico',
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
                KubesphereVersion:'v3.4.1',
                KubekeyNamespace: 'kubekey-system',
            }
        ]
    )
    const handleChange = newV => {
        setClusterData(prevState => [...prevState,newV])
    }


    return (
        <ClusterTableContext.Provider value={{ clusterData, handleChange}}>
            {children}
        </ClusterTableContext.Provider>
    )
}
export default ClusterTableContext
