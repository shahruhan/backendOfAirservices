import React, { useEffect, useState } from "react";
import {useNavigate, NavLink, useLocation} from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:5000';
 
const UsersInfo_page = () => {

    const history = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [userData, setUserData] = useState('');
    const [userInfoData, setUserInfoData] = useState([]);

    const callUserInfoPage = async () =>{
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

    

    const callUserInfoData = async () =>{
        
        try{

            const response = await fetch(`${serverUrl}/userInfo`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });

            const resData = await response.json();

            if (resData.length > 0){
                  setUserInfoData(resData);
            }

            if(!response.status === 200) {
                const error = new Error(response.error);
                throw error;
            }

        } catch(err) {
            window.alert(err);
        }
    }
    
    useEffect( () => {
        callUserInfoPage();
        callUserInfoData();
    }, []);

    let id = 0;
    let currentAdminId = userData._id;
    return(
        <>

{/* app-content open*/} 
            <div className="main-content app-content mt-0">
                <div className="side-app">

                    {/*  CONTAINER */}
                    <div className="main-container container-fluid">

                        {/*  PAGE-HEADER */}
                        <div className="page-header">
                            <h1 className="page-title"></h1>
                            <div>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Users Info</li>
                                </ol>
                            </div>

                        </div>
                        {/*  PAGE-HEADER END */}




                        {/*  Row */}
                        <div className="row row-sm">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Users Information</h3>
                                        <div className="add_btn">
                                            <a href='/add_UserProfile' type="button" className="btn btn-primary btn-sm btn-block">Add New User</a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="file-datatable" className="table table-bordered table-hover text-nowrap key-buttons border-bottom">
                                                <thead>
                                                    <tr>
                                                        <th>S.No#</th>
                                                        <th>PHOTO</th>
                                                        <th>NAME</th>
                                                        <th>CONTACT</th>
                                                        <th>EMAIL</th>
                                                        <th>GENDER</th>
                                                        <th>DATE OF BIRTH</th>
                                                        <th>STATUS</th>
                                                        <th>ADDRESS</th>
                                                        <th>ABOUT</th>
                                                        <th>ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    

                                                    userInfoData.map( (currentData) => {

                                                        const {_id, name, contact, gender, email, address,
                                                            bioData, profileImage, date, month, year, status, users
                                                            } = currentData;

                                                        id = id+1;
                                                        // console.log(bioData);
                                                
                                                        if (_id !== currentAdminId){
                                                        return(
                                                        <tr key={id}>
                                                                <td>{id}</td>
                                                                <td className="align-middle text-center">
                                                                    { !profileImage ? <img alt="image" className="avatar-md br-7" src={process.env.PUBLIC_URL+"/images/user-icon/user-icon1.png"}/> : <img alt="image" className="avatar avatar-md" src={process.env.PUBLIC_URL+"/images/users/"+ profileImage} style={{'borderRadius': '50px'}}/> }                                                                              
                                                                </td>
                                                                <td style={{'textTransform': 'capitalize'}}>{name}
                                                                    <span className="text-muted ms-1" style={{textTransform: "capitalize", background: 'yellow'}}>{users}</span>
                                                                </td>
                                                                <td>{contact}</td>
                                                                <td>{email}</td>
                                                                <td>{gender}</td>
                                                                <td>{date},{month},{year}</td>
                                                                <td style={status == 'active' ? {color: "green", fontWeight: "bold", textTransform: "capitalize"} : {color: "red", fontWeight: "bold", textTransform: "capitalize"}}>{status}</td>
                                                                <td>{address}</td>
                                                                <td>{ !bioData ? bioData : truncateString(bioData, 20)}</td>
                                                                <td>
                                                                        <NavLink to={`/user_profile/${_id}`} className='btn tbl-action-view p-0'><span className="fe fe-eye"> </span></NavLink>
                                                                    { users !== 'user' || currentAdminId === _id ? "" :
                                                                        <NavLink to={`/edit_User/${_id}`} className='btn tbl-action-edit p-0'><span className="fe fe-edit"> </span></NavLink>
                                                                    }    
                                                                    { users !== 'user' || currentAdminId === _id ? "" :
                                                                        <button className='btn tbl-action-dlt p-0' id="delete_button" value={`${_id}`} data-name={name}><span className="fe fe-trash-2"> </span></button>
                                                                    }
                                                                </td>
                                                        </tr>
                                                        )
                                                    }
                                                
                                                    })
                                                }   
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  End Row */}

                    </div>
                    {/*  CONTAINER CLOSED */}

                </div>
            </div>
            {/* app-content closed*/}

        </>
    )
}
 
export default UsersInfo_page;

document.addEventListener('DOMContentLoaded', function() {
    $(document).on('click','#delete_button', function(){
        var id =$(this).val();
        var name =$(this).data('name');

        Swal.fire({
            title: "Are you sure you want to delete " +name+ "?",
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
    });

    function setLocation(){
        let path = window.location.pathname;
        if (path === '/users_info'){
            $('body').addClass('sidenav-toggled');
        }
     }
     
    setLocation();
    
});


const deleteUser = async (id) => {
try{
        
    const res = await fetch(`${serverUrl}/delete_User/`+id, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
         credentials: 'include'
    });
    const data = await res.json();

    if (data === 422 || !data){
        toast.error('Something went wrong!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
    }else{
        toast.success('User data deleted successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
            });
            setTimeout(reloadPage, 3000);
            
    }

} catch(err) {
    window.alert(err);
}
}

function reloadPage() {
var currentDocumentTimestamp = new Date(performance.timing.domLoading).getTime();
// Current Time //
var now = Date.now();
// Total Process Lenght as Minutes //
var tenSec = 5 * 1000;
// End Time of Process //
var plusTenSec = currentDocumentTimestamp + tenSec;
if (now > plusTenSec) {
    window.location.reload();
}
}

function truncateString(str, length){
    return str.length > length ? str. substring(0, length - 2) + '...' : str;
}