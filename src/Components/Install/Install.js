import React from 'react';
import {Button, Column, Columns} from "@kube-design/components";
import InstallProgressBar from "./InstallProgressBar";
import InstallForm from "./InstallForm";
import {InstallFormProvider} from "../../context/InstallFormContext";
import {Link} from "react-router-dom";
import useInstallFormContext from "../../hooks/useInstallFormContext";

const Install = () => {
    const {buttonDisabled} = useInstallFormContext()
    return (
            <>
                <Columns>
                    <Column className="is-1"></Column>
                    <Column className="is-2">
                        <h2>安装集群</h2>
                    </Column>
                    <Column className={'is-8'}>
                        <Columns>
                            <Column className={'is-10'}>
                            </Column>
                            <Column>
                                <Link to='/'>
                                    <Button disabled={buttonDisabled}>集群列表</Button>
                                </Link>
                            </Column>
                        </Columns>
                    </Column>
                </Columns>
                <Columns>
                    <Column className={'is-1'}></Column>
                    <Column className={'is-2'}>
                        <InstallProgressBar></InstallProgressBar>
                    </Column>
                    <Column className={'is-8'}>
                        <InstallForm />
                    </Column>
                </Columns>
            </>
    );
};

export default Install;
