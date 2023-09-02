import NodesTable from "./Settings/NodesSetting/NodesTable"
import NodeAddModal from "./Modal/NodeAddModal"
import useFormContext from "../hooks/useFormContext"
import EtcdSetting from "./Settings/ETCDSetting";
import ClusterSetting from "./Settings/ClusterSetting";
import NodeSetting from "./Settings/NodesSetting/NodeSetting";
import NetworkSetting from "./Settings/NetworkSetting";
import StorageSetting from "./Settings/StorageSetting";
import RegistrySetting from "./Settings/RegistrySetting";
import KubesphereSetting from "./Settings/KubesphereSetting";

const FormInputs = () => {

    const { page } = useFormContext()

    console.log(page)

    const display = {
        0: <NodeSetting />,
        1: <EtcdSetting />,
        2: <ClusterSetting />,
        3:<NetworkSetting/>,
        4:<StorageSetting/>,
        5:<RegistrySetting/>,
        6:<KubesphereSetting/>
    }

    const content = (
        <div>
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs
