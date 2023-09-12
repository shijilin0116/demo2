import {createContext, useState} from "react";

const InstallFormContext = createContext({})

export const InstallFormProvider = ({children}) => {

    const [ksEnable,setKsEnable] = useState(false)
    const [ksVersion,setKsVersion] = useState('')
    const [KubekeyNamespace,setKubekeyNamespace] = useState('kubekey-system')
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
        apiVersion: 'kubekey.kubesphere.io/v1alpha2',
        kind: 'Cluster',
        metadata: {
            name: 'sample',
        },
        spec:{
            hosts:[{
                name : 'node1',
                role: ['Master'],
                address : '192.168.6.2',
                internalAddress : '192.168.6.2',
                port: 8022,
                user: 'root',
                password : '123456',
                privateKeyPath: '/var/root/.ssh/id_rsa'
            },
                {
                name : 'node2',
                    role: ['Master'],
                address : '192.168.6.2',
                internalAddress : '192.168.6.2',
                user : 'root',
                password : '123456',
                privateKeyPath: '/var/root/.ssh/id_rsa'
                },
                {
                name : 'node3',
                    role: ['Master'],
                address : '192.168.6.2',
                internalAddress : '192.168.6.2',
                user : 'root',
                password : '123456',
                privateKeyPath: '/var/root/.ssh/id_rsa'
                }],
            roleGroups: {
                etcd: ['node1'],
                master: ['node1'],
                worker: ['node2'],
            },
            controlPlaneEndpoint: {
                internalLoadbalancer: 'haproxy',
                externalDNS: false,
                domain: 'lb.kubesphere.local',
                address: '',
                port: 6443,
            },
            system: {
                ntpServers: [
                    'time1.cloud.tencent.com',
                    'ntp.aliyun.com',
                    'node1',
                ],
                timezone: 'Asia/Shanghai',
                rpms: ['nfs-utils'],
                debs: ['nfs-common'],
            },
            kubernetes: {
                version: 'v1.21.5',
                apiserverCertExtraSans: ['192.168.8.8', 'lb.kubespheredev.local'],
                containerManager: 'docker',
                clusterName: 'cluster.local',
                autoRenewCerts: true,
                masqueradeAll: false,
                maxPods: 110,
                podPidsLimit: 10000,
                nodeCidrMaskSize: 24,
                proxyMode: 'ipvs',
                featureGates: {
                    CSIStorageCapacity: true,
                    ExpandCSIVolumes: true,
                    RotateKubeletServerCertificate: true,
                    TTLAfterFinished: true,
                },
                kubeProxyConfiguration: {
                    ipvs: {
                        excludeCIDRs: ['172.16.0.2/24'],
                    },
                },
            },
            etcd: {
                type: 'kubekey',
                dataDir: '/var/lib/etcd',
                heartbeatInterval: 250,
                electionTimeout: 5000,
                snapshotCount: 10000,
                autoCompactionRetention: 8,
                metrics: 'basic',
                quotaBackendBytes: 2147483648,
                maxRequestBytes: 1572864,
                maxSnapshots: 5,
                maxWals: 5,
                logLevel: 'info',
            },
            network: {
                plugin: 'calico',
                calico: {
                    ipipMode: 'Always',
                    vxlanMode: 'Never',
                    vethMTU: 0,
                },
                kubePodsCIDR: '10.233.64.0/18',
                kubeServiceCIDR: '10.233.0.0/18',
            },
            storage: {
                openebs: {
                    basePath: '/var/openebs/local',
                },
            },
            registry: {
                registryMirrors: [],
                insecureRegistries: [],
                privateRegistry: '',
                namespaceOverride: '',
                auths: {
                    'dockerhub.kubekey.local': {
                        username: 'xxx',
                        password: '***',
                        skipTLSVerify: false,
                        plainHTTP: false,
                        certsPath: '/etc/docker/certs.d/dockerhub.kubekey.local',
                    },
                },
            },
            addons: [],
        },

        // ETCDType:'kubekey',
        // clusterName : '',
        // clusterVersion : '',
        // containerManager : 'docker',
        // autoRenewCert : true,
        // networkPlugin:'',
        // kubePodsCIDR:'10.233.64.0/18',
        // kubeServiceCIDR:'10.233.64.0/18',
        // enableMultusCNI: false,
        // enableLocalStorage:false,
        // usePrivateRegistry:false,
        // privateRegistryUrl:'',
        // // namespaceOverride:'234',
        // registryMirrors:[],
        // insecureRegistries:[],
        // installKubesphere : false,
        // KubesphereVersion:'',
        // KubekeyNamespace: 'kubekey-system',
    })
    // const handleChange = (key,value) => {
    //     // console.log(e)
    //     // console.log(data)
    //     // const type = e.target.type
    //     // const name = e.target.name
    //     // const value = type === "checkbox"
    //     //     ? e.target.checked
    //     //     : e.target.value
    //     setData(prevData => ({
    //         ...prevData,[key]:value
    //     }) )
    //     console.log(data)
    // }
    const handleChange = (fieldName, newValue) => {
        console.log('进入handlerchange')
        console.log(newValue)
        setData(prevState => {
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
        });
    };


    // const {
    //     nodes,
    //     ETCD,
    //     autoRenewCert,
    //     enableLocalStorage,
    //     enableMultusCNI,
    //     installKubesphere,
    //     usePrivateRegistry,
    //     registryMirrors,
    //     insecureRegistries,
    //     privateRegistryUrl,
    //     ...requiredInputs } = data

    const canSubmit = true
    // const canSubmit = [...Object.values(requiredInputs)].every(Boolean)
    //                     && nodes.length>0
    //                     &&ETCD.length>0
    //                     && page === Object.keys(title).length - 1
    //                     && (!data.usePrivateRegistry || (data.usePrivateRegistry && data.privateRegistryUrl!==''))
    //
    const canNextPage0To1 = data.spec.hosts.length>0 && data.spec.roleGroups.master.length > 0
    //
    const canNextPage1To2 = data.spec.roleGroups.etcd.length>0 && data.spec.etcd.type !== ''
    //
    const canNextPage2To3 = data.metadata.name !== '' && data.spec.kubernetes.version !== '' && data.spec.kubernetes.containerManager !== '' && KubekeyNamespace !== ''
    //
    const canNextPage3To4 = data.spec.network.plugin !=='' && data.spec.network.kubePodsCIDR !=='' && data.spec.network.kubeServiceCIDR !== ''
    //     // Object.keys(data)
    //     // .filter(key => key.startsWith('ship') && key !== 'shipAddress2')
    //     // .map(key => data[key])
    //     // .every(Boolean)
    // // const canNextPage4To5 = true
    //
    // const canNextPage5To6 = !data.usePrivateRegistry || (data.usePrivateRegistry && data.privateRegistryUrl!=='')
    //
    // const canNextPage6To7 = !data.installKubesphere || data.KubesphereVersion !== ''

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

    // const allHostHaveRole =

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage0To1)
        || (page === 1 && !canNextPage1To2)
        || (page === 2 && !canNextPage2To3)
        // || (page === 3 && !canNextPage3To4)
        // || (page === 5 && !canNextPage5To6)
        // || (page === 6 && !canNextPage6To7)

    return (
        <InstallFormContext.Provider value={{ ksVersion, setKsVersion, ksEnable,setKsEnable,KubekeyNamespace,setKubekeyNamespace, title, page, setPage, data, setData, canSubmit, handleChange, disablePrev, disableNext}}>
            {children}
        </InstallFormContext.Provider>
    )
}
export default InstallFormContext
