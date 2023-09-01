import Test from "./Test"
import OptIn from "./OptIn"
import useFormContext from "../hooks/useFormContext"
import EtcdSetting from "./ETCDSetting";

const FormInputs = () => {

    const { page } = useFormContext()

    console.log(page)

    const display = {
        0: <Test />,
        1: <EtcdSetting />,
        2: <OptIn />
    }

    const content = (
        <div>
            {display[page]}
        </div>
    )


    return content
}
export default FormInputs
