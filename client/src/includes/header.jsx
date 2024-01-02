import React, { useState, useEffect, useContext } from "react";
import {useNavigate, NavLink, useLocation} from 'react-router-dom';

import { UserContext } from "../Router";

const Header = () => {

    const {state, dispatch} = useContext(UserContext);

    const RenderMenue = () => {
        if(state === "senior admin"){
            return(
                <>
                    <li className="slide">
                        <a className="side-menu__item has-link" data-bs-toggle="slide" href={process.env.PUBLIC_URL+'/dashboard'}>
                                <i className="side-menu__icon fe fe-home"></i>
                                <span className="side-menu__label">Dashboard</span>
                        </a>
                    </li>
                    <li className="sub-category">
                        <h3>Main Pages</h3>
                    </li>
                    <li className={!isExpanded1 ? "slide" : "slide is-expanded"} onClick={()=> setIsExpanded1(!isExpanded1)}>
                    
                        <div className="side-menu__item" data-bs-toggle="slide" style={{'cursor': 'pointer'}}>
                            {/* <i className="side-menu__icon fe fe-slack"></i> */}
                            <i className="side-menu__icon fe fe-users"></i>
                            <span className="side-menu__label">Customers</span>
                            <i className="angle fe fe-chevron-right"></i></div>
                        <ul className="slide-menu">
                            <li className="side-menu-label1">Customers</li>
                            <li><a href={process.env.PUBLIC_URL+'/customer_info'} className="slide-item">Customers Information</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/add_customer'} className="slide-item">Add Customer</a></li>
                            {/* <li><a href={process.env.PUBLIC_URL+'/customer_status'} className="slide-item">Customer Status</a></li> */}
                        </ul>
                    </li>
                    <li className={!isExpanded2 ? "slide" : "slide is-expanded"} onClick={()=> setIsExpanded2(!isExpanded2)}>
                    
                        <div className="side-menu__item" data-bs-toggle="slide" style={{'cursor': 'pointer'}}>
                            {/* <i className="side-menu__icon fe fe-slack"></i> */}
                            <i className="side-menu__icon fe fe-user"></i>
                            <span className="side-menu__label">Users</span>
                            <i className="angle fe fe-chevron-right"></i></div>
                        <ul className="slide-menu">
                            <li className="side-menu-label1">Users</li>
                            <li><a href={process.env.PUBLIC_URL+'/users_info'} className="slide-item">Users Information</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/add_UserProfile'} className="slide-item">Add New User</a></li>
                        </ul>
                    </li>
                </>
            )
        } else {
            return(
                <>
                    <li className="slide">
                        <a className="side-menu__item has-link" data-bs-toggle="slide" href={process.env.PUBLIC_URL+'/dashboard'}>
                                <i className="side-menu__icon fe fe-home"></i>
                                <span className="side-menu__label">Dashboard</span>
                        </a>
                    </li>
                    <li className="sub-category">
                        <h3>Main Pages</h3>
                    </li>
                    <li className={!isExpanded1 ? "slide" : "slide is-expanded"} onClick={()=> setIsExpanded1(!isExpanded1)}>
                    
                        <div className="side-menu__item" data-bs-toggle="slide" style={{'cursor': 'pointer'}}>
                            {/* <i className="side-menu__icon fe fe-slack"></i> */}
                            <i className="side-menu__icon fe fe-users"></i>
                            <span className="side-menu__label">Customers</span>
                            <i className="angle fe fe-chevron-right"></i></div>
                        <ul className="slide-menu">
                            <li className="side-menu-label1">Customers</li>
                            <li><a href={process.env.PUBLIC_URL+'/customer_info'} className="slide-item">Customers Information</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/add_customer'} className="slide-item">Add Customer</a></li>
                            {/* <li><a href={process.env.PUBLIC_URL+'/customer_status'} className="slide-item">Customer Status</a></li> */}
                        </ul>
                    </li>
                    <li className={!isExpanded2 ? "slide" : "slide is-expanded"} onClick={()=> setIsExpanded2(!isExpanded2)}>
                    
                        <div className="side-menu__item" data-bs-toggle="slide" style={{'cursor': 'pointer'}}>
                            {/* <i className="side-menu__icon fe fe-slack"></i> */}
                            <i className="side-menu__icon fe fe-user"></i>
                            <span className="side-menu__label">Users</span>
                            <i className="angle fe fe-chevron-right"></i></div>
                        <ul className="slide-menu">
                            <li className="side-menu-label1">Users</li>
                            <li><a href={process.env.PUBLIC_URL+'/users_info'} className="slide-item">Users Information</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/add_UserProfile'} className="slide-item">Add New User</a></li>
                        </ul>
                    </li>
                    <li className={!isExpanded3 ? "slide" : "slide is-expanded"} onClick={()=> setIsExpanded3(!isExpanded3)}>
                    
                        <div className="side-menu__item" data-bs-toggle="slide" style={{'cursor': 'pointer'}}>
                            {/* <i className="side-menu__icon fe fe-slack"></i> */}
                            <i className="side-menu__icon fe fe-log-in"></i>
                            <span className="side-menu__label">Admin Login</span>
                            <i className="angle fe fe-chevron-right"></i></div>
                        <ul className="slide-menu">
                            <li className="side-menu-label1">Admin Login</li>
                            <li><a href={process.env.PUBLIC_URL+'/admin_Signin'} className="slide-item">Admin Sign-in</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/admin_Signup'} className="slide-item">Admin Sign-up</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/admin_ForgotPass'} className="slide-item">Admin Forgot Password</a></li>
                        </ul>
                    </li>
                    <li className={!isExpanded4 ? "slide" : "slide is-expanded"} onClick={()=> setIsExpanded4(!isExpanded4)}>
                    
                        <div className="side-menu__item" data-bs-toggle="slide" style={{'cursor': 'pointer'}}>
                            {/* <i className="side-menu__icon fe fe-slack"></i> */}
                            <i className="side-menu__icon fe fe-log-in"></i>
                            <span className="side-menu__label">User Login</span>
                            <i className="angle fe fe-chevron-right"></i></div>
                        <ul className="slide-menu">
                            <li className="side-menu-label1"><a href='#'>User Login</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/user_Signin'} className="slide-item">User Sign-in</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/user_Signup'} className="slide-item">User Sign-up</a></li>
                            <li><a href={process.env.PUBLIC_URL+'/user_ForgotPass'} className="slide-item">User Forgot Password</a></li>
                        </ul>
                    </li>
                </>
            )
        }
    }

    const history = useNavigate();
    const location = useLocation();

    const [isExpanded1, setIsExpanded1] = useState(false);
    const [isExpanded2, setIsExpanded2] = useState(false);
    const [isExpanded3, setIsExpanded3] = useState(false);
    const [isExpanded4, setIsExpanded4] = useState(false);

    const [userData, setUserData] = useState('');

    const userHeader = async () =>{
        try{

            const res = await fetch('http://localhost:5000/getdata', {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });

            const data = await res.json();
            setUserData(data);

            // alert(data.users);

            dispatch({ type: "senior admin", payload: data.users });

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch(err) {
            window.alert(err);
            history("/admin_Signin");
        }
    }

    useEffect( () => {
        userHeader();
    }, []);

    return(
        <>

    {/* app-Header */}

    <div className="app-header header sticky">
                <div className="container-fluid main-container">
                    <div className="d-flex">
                        <a aria-label="Hide Sidebar" className="app-sidebar__toggle" data-bs-toggle="sidebar" href={process.env.PUBLIC_URL+'/dashboard'}></a>
                        {/* sidebar-toggle*/}
                        <a className="logo-horizontal " href={process.env.PUBLIC_URL+'/dashboard'}>
                            <img src={process.env.PUBLIC_URL+"/images/brand/logo.png"} className="header-brand-img desktop-logo" alt="logo"/>
                            <img src={process.env.PUBLIC_URL+"/images/brand/logo-3.png"} className="header-brand-img light-logo1" alt="logo"/>
                        </a>
                        {/* LOGO */}
                        <div className="main-header-center ms-3 d-none d-lg-block">
                            <input type="text" className="form-control" id="typehead" placeholder="Search for results..." autoComplete="off"/>
                            <button className="btn px-0 pt-2"><i className="fe fe-search" aria-hidden="true"></i></button>
                        </div>
                        <div className="d-flex order-lg-2 ms-auto header-right-icons">
                            <div className="dropdown d-none">
                                <a href={process.env.PUBLIC_URL+'/dashboard'} className="nav-link icon" data-bs-toggle="dropdown">
                                    <i className="fe fe-search"></i>
                                </a>
                                <div className="dropdown-menu header-search dropdown-menu-start">
                                    <div className="input-group w-100 p-2">
                                        <input type="text" className="form-control" placeholder="Search...."/>
                                        <div className="input-group-text btn btn-primary">
                                            <i className="fe fe-search" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* SEARCH */}
                            <button className="navbar-toggler navresponsive-toggler d-lg-none ms-auto" type="button"
                                data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent-4"
                                aria-controls="navbarSupportedContent-4" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon fe fe-more-vertical"></span>
                            </button>
                            <div className="navbar navbar-collapse responsive-navbar p-0">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent-4">
                                    <div className="d-flex order-lg-2">
                                        <div className="dropdown d-lg-none d-flex">
                                            <a href='#' className="nav-link icon" data-bs-toggle="dropdown">
                                                <i className="fe fe-search"></i>
                                            </a>
                                            <div className="dropdown-menu header-search dropdown-menu-start">
                                                <div className="input-group w-100 p-2">
                                                    <input type="text" className="form-control" placeholder="Search...."/>
                                                    <div className="input-group-text btn btn-primary">
                                                        <i className="fa fa-search" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="d-flex country">
                                            <a className="nav-link icon text-center" data-bs-target="#country-selector"
                                                data-bs-toggle="modal">
                                                <i className="fe fe-globe"></i><span
                                                    className="fs-16 ms-2 d-none d-xl-block">English</span>
                                            </a>
                                        </div> */}
                                        {/* COUNTRY */}
                                        <div className="d-flex country">
                                            <a className="nav-link icon theme-layout nav-link-bg layout-setting">
                                                <span className="dark-layout"><i className="fe fe-moon"></i></span>
                                                <span className="light-layout"><i className="fe fe-sun"></i></span>
                                            </a>
                                        </div>
                                        {/* Theme-Layout */}
                                        
                                        <div className="dropdown d-flex">
                                            <a className="nav-link icon full-screen-link nav-link-bg">
                                                <i className="fe fe-minimize fullscreen-button"></i>
                                            </a>
                                        </div>
                                        {/* FULL-SCREEN */}
                                        {/* <div className="dropdown d-flex header-settings">
                                            <a href='#' className="nav-link icon"
                                                data-bs-toggle="sidebar-right" data-target=".sidebar-right">
                                                <i className="fe fe-align-right"></i>
                                            </a>
                                        </div> */}
                                        {/* SIDE-MENU */}
                                        <div className="dropdown d-flex profile-1">
                                            <a href='#' data-bs-toggle="dropdown" className="nav-link leading-none d-flex">
                                                { !userData.profileImage ? <img  className="avatar  profile-user brround cover-image" alt="image" src={process.env.PUBLIC_URL+"/images/user-icon/user-icon1.png"}/> : <img  className="avatar  profile-user brround cover-image" alt="image" src={process.env.PUBLIC_URL+"/images/users/"+ userData.profileImage}/> }
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                <div className="drop-heading">
                                                    <div className="text-center">
                                                        <h5 className="text-dark mb-0 fs-14 fw-semibold">{userData.name}</h5>
                                                        <small className="text-muted">{userData.users}</small>
                                                    </div>
                                                </div>
                                                <div className="dropdown-divider m-0"></div>
                                                <a href={`/user_profile/${userData._id}`} className="dropdown-item">
                                                    <i className="dropdown-icon fe fe-user"></i>My Profile
                                                </a>
                                                <a className="dropdown-item" href={process.env.PUBLIC_URL+'/lockscreen.html'}>
                                                    <i className="dropdown-icon fe fe-lock"></i> Lockscreen
                                                </a>
                                                <a className="dropdown-item" href={'/logout'}>
                                                    <i className="dropdown-icon fe fe-alert-circle"></i> Sign out
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /app-Header */}

            {/*APP-SIDEBAR*/}
            <div className="sticky">
                <div className="app-sidebar__overlay" data-bs-toggle="sidebar"></div>
                <div className="app-sidebar">
                    <div className="side-header">
                        <a className="header-brand1" href={process.env.PUBLIC_URL+'/dashboard'}>
                            <img src={process.env.PUBLIC_URL+"/images/brand/logo.png"} className="header-brand-img desktop-logo" alt="logo"/>
                            <img src={process.env.PUBLIC_URL+"/images/brand/logo-1.png"} className="header-brand-img toggle-logo" alt="logo"/>
                            <img src={process.env.PUBLIC_URL+"/images/brand/logo-2.png"} className="header-brand-img light-logo" alt="logo"/>
                            <img src={process.env.PUBLIC_URL+"/images/brand/logo-3.png"} className="header-brand-img light-logo1" alt="logo"/>
                        </a>
                        {/* LOGO */}
                    </div>
                    <div className="main-sidemenu">
                        <div className="slide-left disabled" id="slide-left"><svg xmlns="http://www.w3.org/2000/svg"
                                fill="#7b8191" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
                            </svg></div>
                        <ul className="side-menu">
                            <li className="sub-category">
                                <h3>Main</h3>
                            </li>
                            
                            <RenderMenue />
                             
                        </ul>
                        <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                                width="24" height="24" viewBox="0 0 24 24">
                                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
                            </svg></div>
                    </div>
                </div>
                {/*/APP-SIDEBAR*/}
            </div>

            </>
    )
}

export default Header; 