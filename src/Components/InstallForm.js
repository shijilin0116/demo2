import FormInputs from './FormInputs'
import useFormContext from "../hooks/useFormContext"
import {Button, Columns, Column} from "@kube-design/components";

const InstallForm = () => {

    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        disableNext
    } = useFormContext()

    console.log('title.length-1')
    console.log(title.length-1)


    const handlePrev = () => setPage(prev => prev - 1)

    const handleNext = () => setPage(prev => prev + 1)

    const onInstallHandler = e => {
        console.log(data)
    }

    return (
        <>
            <Columns>
                <h2>{title[page]}</h2>
            </Columns>
            <Columns>
                <Column>
                    <FormInputs />
                </Column>
            </Columns>
            <Columns>
                {page !== 0 && <Button onClick={handlePrev} disabled={disablePrev}>上一步</Button>}
                {page !== Object.keys(title).length - 1 && <Button onClick={handleNext} disabled={disableNext}>下一步</Button>}
                {page === Object.keys(title).length - 1 && <Button disabled={!canSubmit} onClick={onInstallHandler}>安装</Button>}
            </Columns>

        </>
    )
}
export default InstallForm
