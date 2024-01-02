import React, { useEffect, useState } from "react";
import {useNavigate, NavLink, useParams} from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import {addUserSchema} from '../schemas';
import $ from 'jquery';
import Swal from 'sweetalert2'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:5000';


const UserProfile_page = () => {

    const history = useNavigate();

    const {id} = useParams();

    let userid = 0;
    let btn = ['btn-primary', 'btn-secondary', 'btn-warning', 'btn-success', 'btn-danger']; 

    const [userData, setUserData] = useState('');
    const [currentUserData, setCurrentUserData] = useState('');
    const [userFullData, setUserFullData] = useState([]);

    const callUserPage = async () =>{
        try{
            const res = await fetch(`${serverUrl}/getdata`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });
            const data = await res.json();

            setUserData(data);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch(err) {
            window.alert(err);
            history("/admin_Signin");
        }
    }

    const callUserData = async () =>{
        try{
            
            const res = await fetch(`${serverUrl}/user_profile/`+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });
            const data = await res.json();

            setCurrentUserData(data.userId);
            setUserFullData(data.allUsers);

            if (data === 422 || !data){
                window.alert("Some thing went wrong");
            }

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch(err) {
            window.alert(err);
        }
    }

    useEffect( () => {
        callUserPage();
        callUserData();
    }, []);
    

    return(
        <>
         {/*app-content open*/}
            <div className="main-content app-content mt-0">
                <div className="side-app">

                    {/* CONTAINER */}
                    <div className="main-container container-fluid">

                        {/* PAGE-HEADER */}
                        <div className="page-header">
                            <h1 className="page-title">User Profile</h1>
                            <div>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                                </ol>
                            </div>
                        </div>
                        {/* PAGE-HEADER END */}

                        {/* ROW-1 OPEN */}
                        <div className="row" id="user-profile">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="wideget-user mb-2">
                                            <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="row">
                                                        <div className="panel profile-cover">
                                                            <div className="profile-cover__action bg-img"></div>
                                                            <div className="profile-cover__img">
                                                                <div className="profile-img-1">
                                                                    { !currentUserData.profileImage ? <img alt="image" src={process.env.PUBLIC_URL+"/images/user-icon/user-icon1.png"}/> : <img alt="image" src={process.env.PUBLIC_URL+"/images/users/"+ currentUserData.profileImage} style={{'maxWidth': '120px', 'height': '120px', 'width': '120px'}}/> }
                                                                </div>
                                                                <div className="profile-img-content text-dark text-start">
                                                                    <div className="text-dark">
                                                                        <h3 className="h3 mb-0" style={{textTransform: "capitalize"}}>{currentUserData.name}</h3>
                                                                        <p className="mb-0" style={{fontSize: "16px"}}>{currentUserData.email}</p>
                                                                        <h5 className="text-muted mb-0" style={{textTransform: "capitalize"}}>{currentUserData.users}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="btn-profile">
                                                            {currentUserData.users === 'user' || userData._id === currentUserData._id ? <NavLink to={`/edit_user/${id}`} className="btn btn-primary mt-1 mb-1"> <i className="fa fa-pencil-square-o" style={{'fontSize': '16px'}}></i> <span>Edit User Profile</span></NavLink>: ''}
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="px-0 px-sm-4">
                                                            <div className="social social-profile-buttons mt-5 float-end">
                                                                <div className="mt-3">
                                                                    <a className="social-icon text-primary" href="https://www.facebook.com/" target="_blank"><i className="fa fa-facebook"></i></a>
                                                                    <a className="social-icon text-primary" href="https://twitter.com/" target="_blank"><i className="fa fa-twitter"></i></a>
                                                                    <a className="social-icon text-primary" href="https://www.youtube.com/" target="_blank"><i className="fa fa-youtube"></i></a>
                                                                    <a className="social-icon text-primary" href="#"><i className="fa fa-rss"></i></a>
                                                                    <a className="social-icon text-primary" href="https://www.linkedin.com/" target="_blank"><i className="fa fa-linkedin"></i></a>
                                                                    <a className="social-icon text-primary" href="https://myaccount.google.com/" target="_blank"><i className="fa fa-google-plus"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xl-9">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="card-title">About</div>
                                            </div>
                                            <div className="card-body">
                                                <div>
                                                    <h5>Biography<i className="fe fe-edit-3 text-primary mx-2"></i></h5>
                                                    <p>
                                                        {currentUserData.bioData}
                                                        {/* <a href="#"> Read more...</a> */}
                                                    </p>
                                                </div>
                                                <hr/>
                                                {currentUserData.users === 'user' ? 
                                                <div className="d-flex align-items-center mb-3 mt-3">
                                                    <div className="me-4 text-center text-primary">
                                                        <span><i className="fe fe-zap fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong className={currentUserData.status=='active' ? 'text-success': 'text-danger'} style={{textTransform: "capitalize", fontWeight: 'bolder'}}>
                                                            {currentUserData.status}
                                                        </strong>
                                                    </div>
                                                </div>
                                                : ''}
                                                <div className="d-flex align-items-center mb-3 mt-3">
                                                    <div className="me-4 text-center text-primary">
                                                        <span><i className="fe fe-users fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong style={{textTransform: "capitalize"}}>{currentUserData.gender}</strong>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3 mt-3">
                                                    <div className="me-4 text-center text-primary">
                                                        <span><i className="fe fe-map-pin fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong style={{textTransform: "capitalize"}}>{currentUserData.address}</strong>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3 mt-3">
                                                    <div className="me-4 text-center text-primary">
                                                        <span><i className="fe fe-phone fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{currentUserData.contact}</strong>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-3 mt-3">
                                                    <div className="me-4 text-center text-primary">
                                                        <span><i className="fe fe-mail fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{currentUserData.email}</strong>
                                                    </div>
                                                </div>
                                                <div className="d-flex align-items-center mb-0 mt-3">
                                                    <div className="me-4 text-center text-primary">
                                                        <span><i className="ti-gift fs-20"></i></span>
                                                    </div>
                                                    <div>
                                                        <strong>{currentUserData.date},{currentUserData.month},{currentUserData.year}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-3">
                                        <div className="card">
                                            <div className="card-header">
                                                <div className="card-title">Users</div>
                                            </div>
                                            <div className="card-body" id="usersListScroll">
                                                <div className="sidebar-mini">
                                                    
                                                    {
                                                         
                                                         userFullData.map( (currentData) => {

                                                            const {_id, name, contact, gender, email, address, users,
                                                                bioData, profileImage, date, month, year, status
                                                                } = currentData;
    
                                                                userid = userid+1;

                                                                if (_id !== id){
                                                                    return(
                                                                        <div className="media overflow-visible mb-sm-5" key={userid}>
                                                                            { !profileImage ? <img alt="image" src={process.env.PUBLIC_URL+"/images/user-icon/user-icon1.png"}/> : <img alt="image" src={process.env.PUBLIC_URL+"/images/users/"+ profileImage} style={{'borderRadius': '50px'}}/> }
                                                                            <div className="media-body valign-middle mt-2">
                                                                                <a href="#" className=" fw-semibold text-dark" style={{textTransform: "capitalize"}}>{name}
                                                                                    <span className="text-muted ms-1" style={{textTransform: "capitalize", background: 'yellow'}}>{users}</span>
                                                                                </a>
                                                                                <p className="text-muted mb-0">{email}</p>
                                                                            </div>
                                                                            <div className="media-body valign-middle text-end overflow-visible mt-2" style={{display: "contents"}}>
                                                                                <NavLink to={`/user_profile/${_id}`} className={"view_button btn btn-sm "+ btn[Math.floor(Math.random() * 5)]}>View</NavLink>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                }else{
                                                                    return;
                                                                }
                                                
                                                        })
                                                    }
                                                                                                        
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="media overflow-visible">
                                                        <div className="media-body valign-middle text-center overflow-visible mt-1">
                                                            <NavLink to="/users_info" className="btn btn-sm btn-primary w-100" type="button">Show All</NavLink>
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                      
                                    </div>
                                </div>
                            </div>
                            {/* COL-END */}
                        </div>
                        {/* ROW-1 CLOSED */}

                    </div>
                    {/* CONTAINER CLOSED */}

                </div>
            </div>
            {/*app-content closed*/}
        </>
    )
}

export default UserProfile_page;

document.addEventListener('DOMContentLoaded', function() {
    $(document).on('click','.view_button', function(){
        reloadPage()
    });
});

function reloadPage() {
    var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
    // Current Time //
    var now = Date.now();
    // Total Process Lenght as Minutes //
    var tenSec = 1 * 1000;
    // End Time of Process //
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
        window.location.reload();
    }
    }