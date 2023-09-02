import FormInputs from './FormInputs'
import useFormContext from "../hooks/useFormContext"
import {Form, Button} from "@kube-design/components";

const InstallForm = () => {

    const {
        page,
        setPage,
        data,
        title,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide
    } = useFormContext()

    const handlePrev = () => setPage(prev => prev - 1)

    const handleNext = () => setPage(prev => prev + 1)

    const handleSubmit = e => {
        // e.preventDefault()
        console.log('为什么')
        console.log(JSON.stringify(data))
    }


    const content = (
        // <form className="form flex-col" onSubmit={handleSubmit}>
        //
        //     <header className="form-header">
        //         <h2>{title[page]}</h2>
        //
        //         <div className="button-container">
        //
        //             <button type="button" className={`button ${prevHide}`} onClick={handlePrev} disabled={disablePrev}>Prev</button>
        //
        //             <button type="button" className={`button ${nextHide}`} onClick={handleNext} disabled={disableNext}>Next</button>
        //
        //             <button type="submit" className={`button ${submitHide}`} disabled={!canSubmit}>Submit</button>
        //         </div>
        //     </header>
        //
        //
        //     <FormInputs />
        //
        // </form>
        <>
            <Button onClick={handlePrev} disabled={disablePrev}>Prev</Button>

            <Button onClick={handleNext} disabled={disableNext}>Next</Button>

            <Button type="submit" disabled={!canSubmit}>Submit</Button>
            <FormInputs />
        </>


    )

    return content
}
export default InstallForm
