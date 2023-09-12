import useInstallFormContext from "../hooks/useInstallFormContext"
import EtcdSetting from "./Settings/ETCDSetting";
import ClusterSetting from "./Settings/ClusterSetting";
import HostSetting from "./Settings/HostSetting/HostSetting";
import NetworkSetting from "./Settings/NetworkSetting";
import StorageSetting from "./Settings/StorageSetting";
import RegistrySetting from "./Settings/RegistrySetting";
import KubesphereSetting from "./Settings/KubesphereSetting";
import InstallSetting from "./Settings/InstallSetting";
import ClusterTable from "./ClusterTable/ClusterTable";
import {ClusterTableProvider} from "../context/ClusterTableContext";

const FormInputs = () => {

    const { page } = useInstallFormContext()

    const display = {
        0: <HostSetting/>,
        1: <EtcdSetting/>,
        2: <ClusterSetting/>,
        3: <NetworkSetting/>,
        4: <StorageSetting/>,
        5: <RegistrySetting/>,
        6: <KubesphereSetting/>,
        7:  <ClusterTableProvider>
                <InstallSetting/>
            </ClusterTableProvider>
    }

    return (
        <div>
            {display[page]}
        </div>
    )
}
export default FormInputs
