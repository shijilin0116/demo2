import {createContext, useEffect, useState} from "react";

const ClusterTableContext = createContext({})

export const ClusterTableProvider = ({children}) => {
    const [clusterData,setClusterData] = useState([])
    useEffect(() => {
        fetch('http://localhost:8082/scanCluster')
            .then(res => res.json())
            .then(data => {
                console.log('useeffect拉取后的data.clusterData is',data.clusterData);
                setClusterData(data.clusterData);
            })
            .catch(error => {
                console.error('Error fetching cluster list:', error);
            });
    }, []);
    const handleChange = newV => {
        setClusterData(prevState => [...prevState,newV])
    }

    const getClusterByName = async (clusterName) => {
        // ...你的异步数据获取逻辑
        const data = await fetch('http://localhost:8082/scanCluster')
            .then(res => res.json())
            .then(data => {
                // ...你的数据处理逻辑
                return data.clusterData.find(item => item.metadata.name === clusterName);
            })
            .catch(error => {
                console.error('Error fetching cluster list:', error);
            });

        return data;
    }

    return (
        <ClusterTableContext.Provider value={{ getClusterByName,clusterData, handleChange}}>
            {children}
        </ClusterTableContext.Provider>
    )
}
export default ClusterTableContext
