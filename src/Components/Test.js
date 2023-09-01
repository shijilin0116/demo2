import useFormContext from "../hooks/useFormContext"
import {Input, Select} from "@kubed/components";

const Test = () => {

    const { data, handleChange } = useFormContext()

    console.log('进入billing')
    const content = (
        <Input name="clusterName" value={data.clusterName} onChange={handleChange}/>
    )

    return content
}
export default Test
