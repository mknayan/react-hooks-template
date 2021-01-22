import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import Layout from '../../../utils/templates/layout/default';
import { APIS } from '../config/constant';
import { API_STATUS } from '../../../config/constant';

class MyAccount extends Component {

    state = {
        markets: [],
        customers: []
    }

    componentDidMount() {
        axios.post(APIS.HOME)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    this.setState({
                        markets: response.data.result
                    });
                }

            });

        // axios.post(APIS.GET_CUSTOMER_LIST)
        //     .then((response) => {
        //         if (response.data.result.status == true) {
        //             this.setState({
        //                 customers: response.data.result.data
        //             });
        //         }

        //     });
    }

    render() {
        return (
            <Layout>
                <div className="search-wrapper">
                    <div className="row align-items-center justify-content-around">
                        <div className="form-group w-25 px-15">
                            myaccount
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default withRouter(MyAccount)