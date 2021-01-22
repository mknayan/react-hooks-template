import React from 'react';
import Logo from './../../../assets/img/LOGO-2020-2-1024x434.png';
import FontsCSS from './../../../assets/fonts/fonts.css';
import StyleCSS from './../../../assets/css/style.css';
import CustomScrollcarCSS from './../../../assets/css/jquery.mCustomScrollbar.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { logout } from '../../../redux/actions/auth'
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom'

import { withRouter, useHistory } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import WhatsAppWidget from 'react-whatsapp-widget'
import 'react-whatsapp-widget/dist/index.css'


const Layout = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const auth = useSelector(state => state.auth);

    const logout_user = (e) => {
        e.preventDefault();
        dispatch(logout())
        history.push('/auth/login')
    }

    return (
        <>
            {/* <!DOCTYPE html /> */}
            {/* <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                    <title>{props.title ? props.title : "Simply Eloped"}</title> */}

            {/* <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700,900" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet" /> */}
            <link rel="stylesheet" href={FontsCSS} />
            <link rel="stylesheet" href={CustomScrollcarCSS} />
            <link rel="stylesheet" href={StyleCSS} />
            {/* </head> */}
            {/* <body> */}
            {/* toast alert */}
            <ToastContainer />
            <header className="header pt-30 pb-20">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="logo">
                                <NavLink to="/"><img className="img-fluid" src={Logo} alt="Simply Eloped" /></NavLink>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <NavLink to="/products">Products</NavLink>
                        </div>
                        <div className="col-md-3 text-right">
                            {
                                auth.token ?
                                    <>
                                        <NavLink to="/myaccount">My Account</NavLink>&nbsp; | &nbsp;
                                        <a href="#" onClick={logout_user}>Logout</a>
                                    </>
                                    :
                                    <NavLink to="/auth/login">Login</NavLink>
                            }
                        </div>
                    </div>
                </div>
            </header>

            <section className="check-list-area">
                <div className="container">{props.children}</div>
            </section>

            <MessengerCustomerChat
                pageId="975848112440297"
                appId="289588928115923"
            // htmlRef={window.location.pathname}
            />
            <WhatsAppWidget phoneNumber='8801714254342' />
            {/* </body>
            </html> */}
        </>
    );
}

export default withRouter(Layout);