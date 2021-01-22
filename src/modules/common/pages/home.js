import React, { Component, Suspense } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom'
import { useSelector } from "react-redux";

import Layout from '../../../utils/templates/layout/default';
import { APIS } from '../config/constant';
import { API_STATUS } from '../../../config/constant';

const Home = () => {
    const auth = useSelector(state => state.auth);

    return (
        <Suspense>
            <Layout>
                <div className="search-wrapper">
                    <div className="row align-items-center justify-content-around">
                        <div className="form-group w-25 px-15">
                            index page
                        </div>
                    </div>
                </div>
            </Layout>
        </Suspense>
    )
};

export default Home;