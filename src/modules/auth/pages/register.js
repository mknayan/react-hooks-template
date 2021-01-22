import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../../../utils/templates/layout/default';
import { APIS } from '../config/constant';
import { API_STATUS } from '../../../config/constant';

export default class Register extends Component {

    state = {
        markets: [],
        customers: []
    }

    componentDidMount() {
        axios.post(APIS.COMMON_MARKET)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    this.setState({
                        markets: response.data.result
                    });
                }

            });

        axios.post(APIS.GET_CUSTOMER_LIST)
            .then((response) => {
                if (response.data.result.status == true) {
                    this.setState({
                        customers: response.data.result.data
                    });
                }

            });
    }

    render() {
        return (
            <Layout>
                <div className="search-wrapper">
                    Register
                </div>
            </Layout>
        );
    }
}