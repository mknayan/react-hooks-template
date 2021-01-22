import React, { Component, Suspense, useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import { CONFIG } from '../../../config/settings';
import ReactImageFallback from "react-image-fallback";

import Layout from '../../../utils/templates/layout/default';
import { APIS } from '../config/constant';
import { API_STATUS } from '../../../config/constant';
import { toast } from 'react-toastify';
import queryString from 'query-string'
import ReactPaginate from 'react-paginate';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

const Products = (props) => {
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageNo, setPageNo] = useState(1);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [activeCategories, setActiveCategories] = useState('');
    const [activeBrands, setActiveBrands] = useState([]);
    const [orderby, setOrderby] = useState('price_low');
    const [product_limit, setProduct_limit] = useState(18);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [loading, setLoading] = useState(true);
    const auth = useSelector(state => state.auth);
    const location = useLocation()
    const history = useHistory()
    const [clocation, setClocation] = useState(location.search)

    useEffect(() => {
        let c_location = location.search;
        setClocation(c_location)
        const parsedQueryString = queryString.parse(c_location, { arrayFormat: 'bracket' })
        if (c_location && parsedQueryString) {
            if (parsedQueryString.orderby) {
                setOrderby(parsedQueryString.orderby)
            }
            if (parsedQueryString.product_limit) {
                setProduct_limit(parsedQueryString.product_limit)
            }
            if (parsedQueryString.max_price) {
                setPriceRange({ min: parsedQueryString.min_price, max: parsedQueryString.max_price })
            }
            if (parsedQueryString.cat_id) {
                setActiveCategories(parsedQueryString.cat_id)
            }
            if (parsedQueryString.brand) {
                setActiveBrands(parsedQueryString.brand)
            }
        }
        axios.get(APIS.PRODUCTS + c_location)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    if (response.data.response.result) {
                        setProducts(response.data.response.data)
                        setPageCount(response.data.response.total_no_of_pages)
                        setPageNo(response.data.response.page_no)
                        setLoading(false)
                    } else {
                        toast.error(response.data.response.message)
                        setProducts([])
                        setPageCount(0)
                        setPageNo(1)
                        setLoading(false)
                    }
                }
            });
    }, [props.match.params]);

    useEffect(() => {
        axios.get(APIS.CATEGORIES)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    if (response.data.response.result) {
                        setCategories(response.data.response.data)
                    } else {
                        toast.error(response.data.response.message)
                    }
                }
            });
        axios.get(APIS.BRANDS)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    if (response.data.response.result) {
                        setBrands(response.data.response.data)
                    } else {
                        toast.error(response.data.response.message)
                    }
                }
            });
    }, [])

    const CategoryLoop = ({ categories }) => {
        return (
            <Fragment>
                <ul>
                    {categories.map((categories_single, categories_index) => {
                        let c_location = location.search;
                        let newurl = queryString.stringifyUrl({ url: c_location, query: { 'cat_id': categories_single.id } }, { arrayFormat: 'bracket' });
                        return (
                            <Fragment key={`category-${categories_single.id}`}>
                                <li><a onClick={(e) => handleCategoryClick(e, categories_single.id)} href={`/products${newurl}`}>{categories_single.name}</a></li>
                                {
                                    categories_single.children && (categories_single.children.length > 0) ?
                                        <CategoryLoop categories={categories_single.children} />
                                        : ''
                                }
                            </Fragment>
                        )
                    })}
                </ul>
            </Fragment>
        )
    }

    const handleCategoryClick = (e, id) => {
        e.preventDefault();
        setPriceRange({ min: 0, max: 10000 })
        setOrderby('price_low')
        setProduct_limit(18)
        setActiveBrands([])
        history.push('/products?cat_id=' + id)
    }

    const handlePageClick = (data) => {
        let selected = parseInt(data.selected);
        let c_location = location.search;
        let newurl = queryString.stringifyUrl({ url: c_location, query: { 'page': selected + 1 } }, { arrayFormat: 'bracket' });
        history.push('/products' + newurl)
    }

    const handlePriceRange = (value) => {
        setPriceRange(value)
        let c_location = location.search;
        let newurl = queryString.stringifyUrl({ url: c_location, query: { 'min_price': value.min, 'max_price': value.max } }, { arrayFormat: 'bracket' });
        history.push('/products' + newurl)
    }

    const handlePriceOrder = (e) => {
        setOrderby(e.target.value)
        let c_location = location.search;
        let newurl = queryString.stringifyUrl({ url: c_location, query: { 'orderby': e.target.value } }, { arrayFormat: 'bracket' });
        history.push('/products' + newurl)
    }

    const handleProductLimit = (e) => {
        setProduct_limit(e.target.value)
        let c_location = location.search;
        let newurl = queryString.stringifyUrl({ url: c_location, query: { 'product_limit': e.target.value } }, { arrayFormat: 'bracket' });
        history.push('/products' + newurl)
    }

    return (
        <Suspense>
            <Layout>
                <div className="search-wrapper">
                    <div className="row">
                        <div className="col-md-3">
                            <h3>Category</h3>
                            {
                                categories.length > 0 ?
                                    <CategoryLoop categories={categories} />
                                    :
                                    ''
                            }
                            <h3>Price</h3>
                            <br />
                            <InputRange
                                maxValue={10000}
                                minValue={0}
                                value={priceRange}
                                onChange={value => handlePriceRange(value)} />
                            <br />

                            <h3>Brand</h3>
                            {
                                brands.length > 0 ?
                                    <ul>
                                        {
                                            brands.map((brands_single, brands_index) => {
                                                let c_location = location.search;
                                                let newurl = queryString.stringifyUrl({ url: c_location, query: { 'brand[]': brands_single.name } }, { arrayFormat: 'bracket' });
                                                return (
                                                    <li key={`brands-${brands_single.id}`}><NavLink to={`/products${newurl}`}>{brands_single.name}</NavLink></li>
                                                )
                                            })
                                        }
                                    </ul>
                                    :
                                    ''
                            }
                        </div>
                        <div className="col-md-9">
                            <div className="text-right">
                                <select name="orderby" id="sortPrice" onChange={handlePriceOrder} value={orderby}>
                                    <option value="price_low"> Sort by price low </option>
                                    <option value="price_high"> Sort by pirce high</option>
                                </select>
                                <select name="product_limit" id="product_limit" onChange={handleProductLimit} value={product_limit}>
                                    <option value="6">Show 6</option>
                                    <option value="12">Show 12</option>
                                    <option value="18">Show 18</option>
                                    <option value="24">Show 24</option>
                                    <option value="48">Show 48</option>
                                    <option value="90">Show 90</option>
                                </select>
                            </div>
                            <br />
                            {
                                loading ?
                                    <div className="loading">
                                        <ReactImageFallback
                                            src={require('../../../assets/img/loading.gif').default}
                                            fallbackImage={require('../../../assets/img/no-image.png').default}
                                            initialImage={require('../../../assets/img/loading.gif').default}
                                            alt="no image"
                                            style={{ width: '30px' }}
                                            className="" />
                                    </div>
                                    :
                                    <Fragment>
                                        {
                                            products.length > 0 ?
                                                <Fragment>
                                                    <div className="row">
                                                        {
                                                            products.map((products_single, products_single_index) => {
                                                                const others_data = JSON.parse(products_single.others)
                                                                const feature_image = (others_data && others_data.feature_image) ? others_data.feature_image.medium_img : require('../../../assets/img/no-image.png').default
                                                                return (
                                                                    <div className="col-md-4" key={`product-${products_single.uuid}`}>
                                                                        <NavLink to={`/products/${products_single.slug}`}>
                                                                            <div style={{ marginBottom: '10px' }}>
                                                                                <ReactImageFallback
                                                                                    src={`${CONFIG.API_BASE_URL}/../files/docs/Products/${feature_image}`}
                                                                                    fallbackImage={require('../../../assets/img/no-image.png').default}
                                                                                    initialImage={require('../../../assets/img/loading.gif').default}
                                                                                    alt={products_single.name}
                                                                                    style={{ width: '100%' }}
                                                                                    className="" />
                                                                                <h5>{products_single.name}</h5>
                                                                                <div className="row">
                                                                                    <div className="col-sm-6">C$ {parseFloat(products_single.price).toFixed(2)}</div>
                                                                                    {
                                                                                        others_data.special_price && (others_data.special_price != '') ?
                                                                                            <div className="col-sm-6 text-right" style={{ textDecoration: 'line-through' }}>C$ {parseFloat(others_data.special_price).toFixed(2)}</div>
                                                                                            :
                                                                                            ''
                                                                                    }
                                                                                </div>
                                                                                <div className="text-center"><button className="btn btn-success">View Details</button></div>
                                                                            </div>
                                                                        </NavLink>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <ReactPaginate
                                                        forcePage={pageNo - 1}
                                                        previousLabel={'previous'}
                                                        nextLabel={'next'}
                                                        breakLabel={'...'}
                                                        breakClassName={'break-me'}
                                                        pageCount={pageCount}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={3}
                                                        onPageChange={handlePageClick}
                                                        containerClassName={'pagination'}
                                                        subContainerClassName={'pages pagination'}
                                                        activeClassName={'active'}
                                                    />
                                                </Fragment>
                                                :
                                                <div className="text-center">No data found</div>
                                        }
                                    </Fragment>
                            }

                        </div>
                    </div>
                </div>
            </Layout>
        </Suspense>
    )
};



export default Products;