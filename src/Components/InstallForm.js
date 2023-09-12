import FormInputs from './FormInputs'
import useInstallFormContext from "../hooks/useInstallFormContext"
import {Button, Columns, Column} from "@kube-design/components";
import {Link} from "react-router-dom";

const InstallForm = () => {

    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        disableNext
    } = useInstallFormContext()

    const handlePrev = () => {
        setPage(prev => {
            console.log('转去',prev-1)
            return +prev-1
        })
    }

    const handleNext = () => {
        setPage(prev => {
            console.log('转去',prev+1)
            return +prev+1
        })
    }

    const onInstallHandler = e => {
        console.log(data)
        fetch('http://localhost:8082/test3',{
            method:'post',
            body:JSON.stringify({data:data}),
            headers:{
                "Content-type":"application/json"
            }
        })
            .then(
        )
        console.log(JSON.stringify({data:data}))
    }

    return (
        <>
            <Columns>
                <Column className='is-10'>
                    <h2>{title[page]}</h2>
                </Column>
                <Column>
                    <Link to='/'>
                        <Button>查看集群</Button>
                    </Link>
                </Column>
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
