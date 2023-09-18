import InstallFormInputs from './InstallFormInputs'
import useInstallFormContext from "../../hooks/useInstallFormContext"
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
        disableNext,
        installHandler
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

    // const onInstallHandler = e => {
    //     console.log(data)
    //     fetch('http://localhost:8082/test3',{
    //         method:'post',
    //         body:JSON.stringify({data:data}),
    //         headers:{
    //             "Content-type":"application/json"
    //         }
    //     })
    //         .then(
    //     )
    //     console.log(JSON.stringify({data:data}))
    // }

    return (
        <>
            <Columns>
                <Column className='is-10'>
                    <h3>{title[page]}</h3>
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <InstallFormInputs />
                </Column>
            </Columns>
            <Columns>
                <Column className='is-8'/>
                <Column className='is-2'>
                    <Columns>
                        <Column className='is-5'/>
                        <Column>
                            {page !== 0 && <Button onClick={handlePrev} disabled={disablePrev}>上一步</Button>}
                        </Column>
                    </Columns>
                </Column>
                <Column className='is-1'>
                    {page !== Object.keys(title).length - 1 && <Button onClick={handleNext} disabled={disableNext}>下一步</Button>}
                    {page === Object.keys(title).length - 1 && <Button disabled={!canSubmit} onClick={installHandler}>安装</Button>}
                </Column>
            </Columns>

        </>
    )
}
export default InstallForm
