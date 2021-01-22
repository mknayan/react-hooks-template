import React, { Suspense, useState, useEffect, useReducer } from "react";
import { useStore, useDispatch, useSelector } from "react-redux";
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../../utils/templates/layout/default';
import { APIS } from '../config/constant';
import { API_STATUS } from '../../../config/constant';
import { initUserAuthentication } from '../../../redux/actions/auth'

import { toast } from 'react-toastify';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()
    // const store = useStore()

    // const auth = useSelector(state => state.auth);
    // console.log('redux auth', auth);
    const dispatch = useDispatch();


    /*useEffect(() => {
        async function fetchData() {
            updateCountryList([])
            updateSelectedCountry('')
            updateSelectedTimeZone('')
            if (query != '') {
                await fetchCountry(query).then(function (data) {
                    if (data.status) {
                        setCountry([])
                    } else {
                        setCountry(data)
                        updateCountryList(data)
                        updateSelectedCountry(data[0])

                        if (data[0].capital) {
                            const timezoneArray = cityTimezones.lookupViaCity(data[0].capital)
                            let timezone = ''
                            if (timezoneArray && timezoneArray.length > 0) {
                                timezone = timezoneArray[0].timezone
                            }
                            updateSelectedTimeZone(timezone)
                        }
                    }
                })
            }
        }
        fetchData()
    }, [query]);*/

    const submitLogin = (e) => {
        e.preventDefault();
        const formdata = {
            email, password
        }
        // const formdata = new FormData();
        // formdata.append('email', email)
        // formdata.append('password', password)

        axios.post(APIS.LOGIN, formdata)
            .then((response) => {
                if (response.data.status == API_STATUS.OK) {
                    if (response.data.response.result) {
                        // store.dispatch({ type: TYPES.INIT_USER_AUTHENTICATION, payload: response.data.response.data })
                        dispatch(initUserAuthentication(response.data.response.data))
                        history.push('/myaccount');
                    } else {
                        toast.error(response.data.response.message)
                    }
                    console.log('response.data', response.data)
                }
            });
    }

    return (
        <Suspense>
            <Layout>
                <form method="POST" onSubmit={submitLogin}>
                    <input type="text" name="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} /><br />
                    <input type="password" name="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} /><br />
                    <input type="submit" name="submit" value="Login" />
                </form>
            </Layout>
        </Suspense>
    )
};

export default withRouter(Login);