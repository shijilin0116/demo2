import React from 'react';
import {click} from "@testing-library/user-event/dist/click";
import {Button} from "@kube-design/components";
import {Link, Redirect} from "react-router-dom";

const Home = () => {

    return (
        <div>
            <Link to='/install'>
                <Button>新建集群</Button>
            </Link>

        </div>
    );
};

export default Home;
