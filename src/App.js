import React from 'react';
import {Column, Columns} from "@kube-design/components";
import logo from './assets/kubekey-logo.svg';
import Install from "./Components/Install";
import {Route, Switch} from "react-router-dom";
import Home from "./Components/Home";
const App = () => {
  return (
      <div>
          <Columns>
              <Column className={'is-1'}></Column>
              <Column className={'is-2'}>
                  <img src={logo} alt='logo' style={{width:'70%',height:'70%',marginTop: '10px'}}></img>
              </Column>
          </Columns>
          <Switch>
              <Route exact path="/">
                  <Home/>
              </Route>
              <Route path="/install">
                  <Install/>
              </Route>
              <Route path="*">
                <div>路径错误</div>
              </Route>
          </Switch>


      </div>
  )
}
export default App;
