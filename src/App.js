import React from 'react';
import {Column, Columns} from "@kube-design/components";
import {FormProvider} from "./context/FormContext";
import InstallForm from "./Components/InstallForm";
import ProgressBar from "./Components/ProgressBar";

const App = () => {
  return (
      <div>
          <Columns>
              <Column className={'is-1'}></Column>
              <Column className={'is-2'}>
                  <img src='https://raw.githubusercontent.com/kubesphere/kubekey/ebfde7ce2320e985a6e02177ee7908ac1dc350f5/docs/img/kubekey-logo.svg' alt='logo' style={{width:'70%',height:'70%',marginTop: '10px'}}></img>
              </Column>
          </Columns>
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
      </div>
  )
}
export default App;
