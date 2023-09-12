import React from 'react';
import {Column, Columns} from "@kube-design/components";
import ProgressBar from "./ProgressBar";
import InstallForm from "./InstallForm";
import {InstallFormProvider} from "../context/InstallFormContext";

const Install = () => {
    return (
            <InstallFormProvider>
                <Columns>
                    <Column className={'is-1'}></Column>
                    <Column className={'is-2'}>
                        <ProgressBar></ProgressBar>
                    </Column>
                    <Column className={'is-8'}>
                        <InstallForm />
                    </Column>
                </Columns>
            </InstallFormProvider>
    );
};

export default Install;
