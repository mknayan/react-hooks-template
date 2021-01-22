import React, { Component } from 'react';
import axios from 'axios';

import Layout from './../../../utils/templates/layout/default';
import { APIS, CL_VENDOR_MAP, CL_PERMIT_MAP, CL_HMU_MAP, CL_FLOWER_MAP, CL_ITINERARY_MAP, CL_INVOICE_MAP } from './../config/constant';
import { API_STATUS } from './../../../config/constant';

export default class Dashboard extends Component {

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
                    <div className="row align-items-center justify-content-around">
                        <div className="form-group w-25 px-15">
                            <label className="mb-2" for="owner">Owner</label>
                            <select name="owner" id="owner" className="form-control">
                                <option value="">--</option>
                                <option value="Janessa">Janessa</option>
                            </select>
                        </div>
                        <div className="form-group w-25 px-15">
                            <label className="mb-2" for="market">Market</label>
                            <select name="market" id="market" className="form-control">
                                <option value="">---</option>
                                {Object.keys(this.state.markets).map((value, index) => {
                                    return <option value={value}>{this.state.markets[value]}</option>
                                })}
                            </select>
                        </div>
                        <div className="form-group w-40 select-dropdown-with-clear-btn px-15">
                            <label className="mb-2" for="customer">Customer</label>
                            <select name="customer" id="customer" className="form-control">
                                <option value="">--</option>
                                <option value="Jhon Doe">Jhon Doe</option>
                            </select>

                            <div className="clear-button">Clear</div>
                        </div>

                        <div className="form-group w-10 px-15">
                            <button className="btn btn-submit mt-25 w-100" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
                {/* /search-wrapper */}

                {/* Search Terms With Number */}
                <div className="search-terms-wrapper mt-10">
                    <div className="container px-0">
                        <div className="search-terms d-lg-flex justify-content-between align-items-xl-center">
                            <div className="terms-with-number mb-10 mb-lg-0 terms-primary d-xl-flex align-items-center">
                                <span className="number">99</span>
                                <span className="terms-text">All Open Tasks</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">68</span>
                                <span className="terms-text">Needs Vendors</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">32</span>
                                <span className="terms-text">Concerns</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">50</span>
                                <span className="terms-text">Needs HMU Address</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">50</span>
                                <span className="terms-text">Needs Flower Address</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">50</span>
                                <span className="terms-text">Needs Itinerary</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">9</span>
                                <span className="terms-text">Check In</span>
                            </div>
                            <div className="terms-with-number mb-10 mb-lg-0 d-xl-flex align-items-center">
                                <span className="number">50</span>
                                <span className="terms-text">Needs Payment</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Search Terms With Number */}
                <div className="table-responsive">
                    <table className="checklist-table table mt-20">
                        <thead>
                            <tr>
                                <td className="text-center">Customer</td>
                                <td className="text-left">Ceremony</td>
                                <td className="text-center">Vendors</td>
                                <td className="text-center">Permit</td>
                                <td className="text-center">HMU<br />Address</td>
                                <td className="text-center">Flower Delivery<br />Address</td>
                                <td className="text-center">Itinerary</td>
                                <td className="text-center w-110">Concern</td>
                                <td className="text-center">Checked In</td>
                                <td className="text-center w-150">Invoice</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.customers.map((data) => {

                                return (
                                    <tr>
                                        <th className="text-center blue-border-left">{data.first_name} {data.last_name}</th>
                                        <td>
                                            <div><strong>{data.market_venue.name}</strong></div>
                                            <span className="small-text">{data.ceremony_date_formatted} - {data.ceremony_time_formatted}</span>
                                        </td>
                                        <td className="text-center">
                                            {/* {data.customer_checklist.vendors} */}
                                            <div className={`circle-checkbox  ${data.customer_checklist ? CL_VENDOR_MAP['CLASS'][data.customer_checklist.vendors] : CL_VENDOR_MAP['CLASS'][0]}`}></div>
                                            <span className="small-text">{data.customer_checklist ? CL_VENDOR_MAP['STATUS_TEXT'][data.customer_checklist.vendors] : CL_VENDOR_MAP['STATUS_TEXT'][0]}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`circle-checkbox ${data.customer_checklist ? CL_PERMIT_MAP['CLASS'][data.customer_checklist.permit] : CL_PERMIT_MAP['CLASS'][0]}`}></div>
                                            <span className="small-text">{data.customer_checklist ? CL_PERMIT_MAP['STATUS_TEXT'][data.customer_checklist.permit] : CL_PERMIT_MAP['STATUS_TEXT'][0]}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`circle-checkbox ${data.customer_checklist ? CL_HMU_MAP['CLASS'][data.customer_checklist.hmu] : CL_HMU_MAP['CLASS'][0]}`}></div>
                                            <span className="small-text">{data.customer_checklist ? CL_HMU_MAP['STATUS_TEXT'][data.customer_checklist.hmu] : CL_HMU_MAP['STATUS_TEXT'][0]}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`circle-checkbox ${data.customer_checklist ? CL_FLOWER_MAP['CLASS'][data.customer_checklist.flower] : CL_FLOWER_MAP['CLASS'][0]}`}></div>
                                            <span className="small-text">{data.customer_checklist ? CL_FLOWER_MAP['STATUS_TEXT'][data.customer_checklist.flower] : CL_FLOWER_MAP['STATUS_TEXT'][0]}</span>
                                        </td>
                                        <td className="text-center">
                                            <div className={`circle-checkbox ${data.customer_checklist ? CL_ITINERARY_MAP['CLASS'][data.customer_checklist.itinerary] : CL_ITINERARY_MAP['CLASS'][0]}`}></div>
                                            <span className="small-text">{data.customer_checklist ? CL_ITINERARY_MAP['STATUS_TEXT'][data.customer_checklist.itinerary] : CL_ITINERARY_MAP['STATUS_TEXT'][0]}</span>
                                        </td>
                                        <td>
                                            <div className="text-underline text-center text-primary small-text font-600">
                                                {data.customer_checklist && data.customer_checklist.concern ? data.customer_checklist.concern : 'No'} Concern
                                            </div>
                                        </td>
                                        <td>
                                            <div className="checkbox text-center">
                                                <div className="custom-style-checkbox">
                                                    <input type="checkbox" id={`IDCheckedIn${data.id}`} onChange={() => { }}
                                                        checked={data.customer_checklist && data.customer_checklist.checked_in ? true : false} />
                                                    <label for={`IDCheckedIn${data.id}`}></label>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {data.customer_checklist ?
                                                data.customer_checklist.invoice == 3 ?
                                                    <>
                                                        <div className="circle-checkbox done"></div>
                                                        <span className="small-text">Done</span>
                                                    </>
                                                    : //else 
                                                    <div className={`${CL_INVOICE_MAP['CLASS'][data.customer_checklist.invoice]} small-text text-center font-600`}>
                                                        {data.customer_checklist.invoice_detail ?
                                                            data.customer_checklist.invoice_detail
                                                            :
                                                            CL_INVOICE_MAP['STATUS_TEXT'][data.customer_checklist.invoice]
                                                        }
                                                    </div>
                                                : null}

                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Layout>
        );
    }
}