import React from 'react';
import {Column, Columns} from "@kube-design/components";
import ProgressBar from "./ProgressBar";
import InstallForm from "./InstallForm";
import {FormProvider} from "../context/FormContext";

const Install = () => {
    return (
            <FormProvider>
                <Columns>
                    <Column className={'is-1'}></Column>
                    <Column className={'is-2'}>
                        <ProgressBar></ProgressBar>
                    </Column>
                    <Column className={'is-8'}>
                        <InstallForm />
                    </Column>
                </Columns>
            </FormProvider>
    );
};

export default Install;
