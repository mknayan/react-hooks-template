import React, { Component } from 'react';
import Layout from './default';

export default class Home extends Component {
    render() {
        return (
            <Layout>
                <div className="search-wrapper">
                    <div className="row align-items-center justify-content-around">
                        <h3 className="text-center">Page Not Found</h3>
                    </div>
                </div>
            </Layout>
        );
    }
}