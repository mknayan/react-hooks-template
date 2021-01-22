import React, { Component, Suspense, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom'
import { CONFIG } from '../../../config/settings';
import ReactImageFallback from "react-image-fallback";

import Layout from '../../../utils/templates/layout/default';
import { APIS } from '../config/constant';
import { API_STATUS } from '../../../config/constant';
import { toast } from 'react-toastify';

const ProductDetails = (props) => {
    const [products, setProducts] = useState([]);
    const history = useHistory()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(APIS.PRODUCTS)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    if (response.data.response.result) {
                        setProducts(response.data.response.data)
                        setLoading(false)
                    } else {
                        toast.error(response.data.response.message)
                    }
                }
            });
    }, [props.match.params]);

    useEffect(() => {
        // axios.get(APIS.CATEGORIES)
        //     .then((response) => {
        //         if (response.data.status == API_STATUS.OK) {
        //             if (response.data.response.result) {
        //                 setCategories(response.data.response.data)
        //             } else {
        //                 toast.error(response.data.response.message)
        //             }
        //         }
        //     });
    }, [])

    return (
        <Suspense>
            <Layout>
                <div className="search-wrapper">
                    <div className="row">
                        <div className="col-md-6">
                            slider
                        </div>
                        <div className="col-md-6">
                            details

                        </div>
                    </div>
                </div>
            </Layout>
        </Suspense>
    )
};



export default ProductDetails;