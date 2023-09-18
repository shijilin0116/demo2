import React from 'react';
import useDeleteNodeFormContext from "../../hooks/useDeleteNodeFormContext";
import {Button, Column, Columns} from "@kube-design/components";
import DeleteNodeFormInputs from "../DeleteNode/DeleteNodeFormInputs";
import useAddNodeFormContext from "../../hooks/useAddNodeFormContext";
import AddNodeFormInputs from "./AddNodeFormInputs";

const AddNodeForm = () => {
    const {
        page,
        setPage,
        title,
        canSubmit,
        disablePrev,
        setDisableButton,
        disableNext
    } = useAddNodeFormContext()
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
    return (
        <>
            <Columns>
                <Column className='is-10'>
                    <h3>{title[page]}</h3>
                </Column>
            </Columns>
            <Columns>
                <Column>
                    <AddNodeFormInputs/>
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
                    {page === Object.keys(title).length - 1 && <Button disabled={!canSubmit} >新增</Button>}
                </Column>
            </Columns>

        </>
    );
};

export default AddNodeForm;
