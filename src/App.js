import React, {useState} from 'react';
import {Banner, Button, Col, Row} from "@kube-design/components";
import {Check, Forward, TableChart} from "@kubed/icons";
import {FormProvider} from "./context/FormContext";
import InstallForm from "./Components/InstallForm";
import NodeAddModal from "./Components/Modal/NodeAddModal";

const App = () => {
  const [KubernetesSetting, setKubernetesSetting] = useState(
      {
        clusterName : '',
        clusterVersion : '',
        containerManager : '',
        autoRenewCert : true
      }
  )
  const changeKubernetesSettingHandler = (newV) => {
    setKubernetesSetting(newV)
  }
  const [ETCD,setETCD] = useState([])
  const [curStepId,setCurStepId] = useState(0)
  // const [autoRenewCert,setAutoRenewCert] = useState(true)
  const [nodesData,setNodesData] = useState([
    {
      id :'1',
      nodeName : 'node1',
      Address : '192.168.6.2',
      InternalAddress : '192.168.6.2',
      role : ['Master'],
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
    }
  ])
  const [stepData,setStepData] = useState(
      [
        {
          id : 0,
          title : '主机设置',
          description: '主机设置下可以设置要创建的K8s集群的节点信息'
        },
        {
          id : 1,
          title : 'ETCD设置',
          description: 'ETCD设置为待创建集群选择一个或多个ETCD'
        },
        {
          id : 2,
          title : '集群设置',
          description: '集群设置用于配置待创建K8s集群的集群信息'
        },
        {
          id : 3,
          title : '网络设置',
          description: '主机设置下可以选择创建的K8s集群的主机信息'
        },
        {
          id : 4,
          title : '存储设置',
          description: '主机设置下可以选择创建的K8s集群的主机信息'
        },
        {
          id : 5,
          title : '镜像仓库设置',
          description: '镜像仓库设置为待创建集群选择合适的镜像仓库'
        },
        {
          id : 6,
          title : 'Kubesphere设置',
          description: '主机设置下可以选择创建的K8s集群的主机信息'
        },
        {
          id : 7,
          title : '安装',
          description: '主机设置下可以选择创建的K8s集群的主机信息'
        }
      ]
  )
  const nodeAddHandler = (node) => {
    setNodesData((prevState)=>[...prevState,node])
  }
  const ETCDChangeHandler = (nodeNames) => {
    setETCD(nodeNames)
  }
  const changeStepHandler = (id) => {
    setCurStepId(id)
  }
  const lastStepHandler = () => {
    setCurStepId((prevState) => prevState-1)
  }
  const nextStepHandler = () =>{
    setCurStepId((prevState) => prevState+1)
  }
  const PlaceHolder = ({ children }) => (
      <div style={{ background: 'papayawhip' }}>{children}</div>
  );
  return (
      <div>
          <FormProvider>
              <InstallForm />
          </FormProvider>
      </div>
  )
}
export default App;
