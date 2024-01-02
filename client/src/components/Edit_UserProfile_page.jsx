import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import {editUserSchema} from '../schemas';
import $ from 'jquery';
import Swal from 'sweetalert2';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:5000';


const Edit_UserProfile_page = () => {

    const history = useNavigate();

    const {id} = useParams();

	const [newPassShow, setNewPassShow] = useState(false);
	const [conPassShow, setConPassShow] = useState(false);
    const [file, setFile] = useState();

    const [userData, setUserData] = useState('');

    const [editUserData, setEditUserData] = useState({
        name:"", contact:"", gender:"", email:"", address:"",
        bioData:"", profileImage:"", date:"", month:"", year:"", password:"", conPassword:""
    });

    const callEditUserPage = async () =>{
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

    const callEditUser = async () =>{
        try{
            
            const res = await fetch(`${serverUrl}/edit_User/`+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });
            const data = await res.json();

            setEditUserData(data);

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
        callEditUserPage();
        callEditUser();
    }, []);

    const handleInput = async (event) =>{

        const _id = editUserData._id;

        // alert(_id);

        const formData = new FormData();
        formData.append('_id', _id);
        formData.append('file', file);
        axios.post(`${serverUrl}/edit_userProfile`, formData)
        .then(res => {
            alert(res);
            if (res === 422 || !res){
                // setUserProfileData(res)
                toast.error('Plz select the profile!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
            }
            else{
                
                setTimeout(reloadPage, 5000);
                toast.success('Profile Updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
                    // history("/add_UserProfile");
            }
        } )
        .catch(err => console.log(err))

        // const data = await res.json();


    }



        //storing data in data base in using states

        const PostData = async (event) =>{

            const Data = event;
            const { _id, name, contact, gender, email, address,
                    bioData, profileImage, date, month, year, password, conPassword
                } = Data;
    
            const res = await fetch(`${serverUrl}/edit_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    _id, name, contact, gender, email, address,
                    bioData, profileImage, date, month, year, password, conPassword
                })
            });
    
            const data = await res.json();
            
            if (data === 422 || !data){
                toast.error('Plz fill the required fields properly!', {
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
                toast.success('User updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
            }
        }

    return(
        <>
        {/*app-content open*/}
            <div className="main-content app-content mt-0">
                <div className="side-app">

                    {/* CONTAINER */}
                    <div className="main-container container-fluid">

                        {/* PAGE-HEADER */}
                        <div className="page-header">
                            <h1 className="page-title">Edit User Profile</h1>
                            <div>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Edit User Profile</li>
                                </ol>
                            </div>
                        </div>
                        {/* PAGE-HEADER END */}

                        {/* ROW-1 OPEN */}
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="text-center chat-image mb-5">
                                            <div className="avatar avatar-xxl chat-profile mb-3 brround" style={{'overflow': 'hidden'}}>
                                                { !editUserData.profileImage ? <img alt="image" className="" src={process.env.PUBLIC_URL+"/images/user-icon/user-icon1.png"}/> : <img alt="image" className="" src={process.env.PUBLIC_URL+"/images/users/"+ editUserData.profileImage}/> }
                                            </div>
                                            <div className="main-chat-msg-name">
                                                <a href="profile.html">
                                                    <h3 className="mb-1 text-dark fw-semibold" style={{textTransform: "capitalize"}}>{editUserData.name}</h3>
                                                </a>
                                                <h5 className="mb-1 text-dark fw-semibold">{editUserData.email}</h5>
                                                <p className="text-muted mt-0 mb-0 pt-0 fs-13" style={{textTransform: "uppercase"}}>{editUserData.users}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>     
                                <div className="card">
                                    <div className="card-body">
                                        <form method="POST">
                                            <div className="form-group">
                                                <label className="form-label mt-0 ms-1">Update Profile Image</label>
                                                    <input id="profileImage" className="form-control"
                                                        type="file"
                                                        name='file'
                                                        // value={values.profileImage}
                                                        onChange={ e => setFile(e.target.files[0])}
                                                            />
                                            </div>
                                            <div className="text-end">
                                                <button className="btn btn-primary"
                                                    name='Upload_profile'
                                                    id='Upload_profile'
                                                    onClick={handleInput}
                                                >Update profile</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>                           
                                <div className="card">
                                    <div className="card-header">
                                        <div className="card-title">Account Status</div>
                                    </div>
                                    <div className="card-footer text-end">
                                        {userData._id !== editUserData._id ? 
                                            <div className="btn btn-primary my-1" id="status_button" data-value={`${editUserData._id}`} data-status={editUserData.status} data-name={editUserData.name}>{editUserData.status == 'active' ? "Deactivate" : "Activate"}</div>
                                            : ""
                                        }
                                        <button className='btn btn-danger ms-1 my-1' id="delete_button" value={`${editUserData._id}`} data-name={editUserData.name}>Delete Account</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card">
                                    <div className="card-body">
                                    <Formik
                                                enableReinitialize
                                                initialValues = {
                                                    editUserData
                                                }
                                                validationSchema={editUserSchema}
                                                onSubmit={
                                                    (values, actions) =>{
                                                        const fulldata = {
                                                            ...values,
                                                        }
                                                        PostData(fulldata);
                                                        // actions.resetForm();
                                                    }
                                                }
                                                
                                            >
                                                {({ isSubmitting, values, errors, touched, handleBlur, handleChange }) => (
                                            <Form method="POST">

                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field id="name" placeholder="Full Name" autoComplete="username" style={{'textTransform': 'capitalize'}} className="form-control"
                                                                    type="text"
                                                                    name='name'
                                                                    value={values.name}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                        />
                                                                <label htmlFor="name">Full Name</label>
                                                                {errors.name && touched.name ? (
                                                                    <p className="form-error">{errors.name}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field id="contact" placeholder="Contact" autoComplete="username" style={{'textTransform': 'capitalize'}} className="form-control"
                                                                    type="text"
                                                                    name='contact'
                                                                    value={values.contact}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                        />
                                                                <label htmlFor="contact">Contact</label>
                                                                {errors.contact && touched.contact ? (
                                                                    <p className="form-error">{errors.contact}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-floating">
                                                            <Field id="email" placeholder="Email" autoComplete="username" className="form-control" disabled
                                                                type="email"
                                                                name='email'
                                                                value={values.email}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                    />
                                                            <label htmlFor="email">Email</label>
                                                            {errors.email && touched.email ? (
                                                                <p className="form-error">{errors.email}</p>
                                                            ) : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-md-12">
                                                        <div className="form-group">
                                                            <Field as="select" className="form-control form-select" id="gender" aria-label="Default select example"
                                                                name="gender"
                                                                value={values.gender}
                                                                onChange={handleChange}
                                                                
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option> 
                                                            </Field>
                                                                <p className="form-error" id="genderForm_error"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                <div className="col-lg-12 col-md-12">
                                                    <div className="form-group">
                                                        <div className="form-floating">
                                                            <Field id="address" placeholder="Address" autoComplete="username" className="form-control"
                                                                type="text"
                                                                name='address'
                                                                value={values.address}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                    />
                                                            <label htmlFor="address">Address</label>
                                                            {errors.address && touched.address ? (
                                                                <p className="form-error">{errors.address}</p>
                                                            ) : null }
                                                        </div>
                                                    </div>
                                                </div>
                                                   
                                                </div>
                                                
                                                <div className="form-group">
                                                    <div className="form-floating">
                                                        <Field as="textarea" id="bioData" placeholder="About Me (My bio data) ..." autoComplete="username" className="form-control"
                                                            type="text"
                                                            name='bioData'
                                                            value={values.bioData}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                                />
                                                        <label htmlFor="bioData">About Me (My bio data) ...</label>
                                                        {errors.bioData && touched.bioData ? (
                                                            <p className="form-error">{errors.bioData}</p>
                                                        ) : null }
                                                    </div>
                                                </div>
                                                
                                            
                                                <label className="form-label ms-1">Date Of Birth</label>
                                                <div className="row">
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <Field as="select" className="form-control form-select" aria-label="Default select example"
                                                                name="date"
                                                                value={values.date}
                                                                onChange={handleChange}
                                                                
                                                            >
                                                                <option value="0">Date</option>
                                                                <option value="01">01</option>
                                                                <option value="02">02</option>
                                                                <option value="03">03</option>
                                                                <option value="04">04</option>
                                                                <option value="05">05</option>
                                                                <option value="06">06</option>
                                                                <option value="07">07</option>
                                                                <option value="08">08</option>
                                                                <option value="09">09</option>
                                                                <option value="10">10</option>
                                                                <option value="11">11</option>
                                                                <option value="12">12</option>
                                                                <option value="13">13</option>
                                                                <option value="14">14</option>
                                                                <option value="15">15</option>
                                                                <option value="16">16</option>
                                                                <option value="17">17</option>
                                                                <option value="18">18</option>
                                                                <option value="19">19</option>
                                                                <option value="20">20</option>
                                                                <option value="21">21</option>
                                                                <option value="22">22</option>
                                                                <option value="23">23</option>
                                                                <option value="24">24</option>
                                                                <option value="25">25</option>
                                                                <option value="26">26</option>
                                                                <option value="27">27</option>
                                                                <option value="28">28</option>
                                                                <option value="29">29</option>
                                                                <option value="30">30</option>
                                                                <option value="31">31</option>
                                                                </Field>
                                                                    {errors.date && touched.date ? (
                                                                            <p className="form-error">{errors.date}</p>
                                                                        ) : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <Field as="select" className="form-control form-select" aria-label="Default select example"
                                                                name="month"
                                                                value={values.month}
                                                                onChange={handleChange}
                                                                
                                                            >
                                                                <option value="0">Month</option>
                                                                <option value="January">Jan</option>
                                                                <option value="February">Feb</option>
                                                                <option value="March">Mar</option>
                                                                <option value="April">Apr</option>
                                                                <option value="May">May</option>
                                                                <option value="June">June</option>
                                                                <option value="July">July</option>
                                                                <option value="August">Aug</option>
                                                                <option value="September">Sep</option>
                                                                <option value="Octuber">Oct</option>
                                                                <option value="November">Nov</option>
                                                                <option value="December">Dec</option>
                                                                </Field>
                                                                    {errors.month && touched.month ? (
                                                                            <p className="form-error">{errors.month}</p>
                                                                        ) : null }
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <Field as="select" className="form-control form-select" aria-label="Default select example"
                                                                name="year"
                                                                value={values.year}
                                                                onChange={handleChange}
                                                                
                                                            >
                                                                <option value="0">Year</option>
                                                                <option value="2030">2030</option>
                                                                <option value="2029">2029</option>
                                                                <option value="2028">2028</option>
                                                                <option value="2027">2027</option>
                                                                <option value="2026">2026</option>
                                                                <option value="2025">2025</option>
                                                                <option value="2024">2024</option>
                                                                <option value="2023">2023</option>
                                                                <option value="2022">2022</option>
                                                                <option value="2021">2021</option>
                                                                <option value="2020">2020</option>
                                                                <option value="2019">2019</option>
                                                                <option value="2018">2018</option>
                                                                <option value="2017">2017</option>
                                                                <option value="2016">2016</option>
                                                                <option value="2015">2015</option>
                                                                <option value="2014">2014</option>
                                                                <option value="2013">2013</option>
                                                                <option value="2012">2012</option>
                                                                <option value="2011">2011</option>
                                                                <option value="2010">2010</option>
                                                                <option value="2009">2009</option>
                                                                <option value="2008">2008</option>
                                                                <option value="2007">2007</option>
                                                                <option value="2006">2006</option>
                                                                <option value="2005">2005</option>
                                                                <option value="2004">2004</option>
                                                                <option value="2003">2003</option>
                                                                <option value="2002">2002</option>
                                                                <option value="2001">2001</option>
                                                                <option value="2000">2000</option>
                                                                <option value="1999">1999</option>
                                                                <option value="1998">1998</option>
                                                                <option value="1997">1997</option>
                                                                <option value="1996">1996</option>
                                                                <option value="1995">1995</option>
                                                                <option value="1994">1994</option>
                                                                <option value="1993">1993</option>
                                                                <option value="1992">1992</option>
                                                                <option value="1991">1991</option>
                                                                <option value="1990">1990</option>
                                                                <option value="1989">1989</option>
                                                                <option value="1988">1988</option>
                                                                <option value="1987">1987</option>
                                                                <option value="1986">1986</option>
                                                                <option value="1985">1985</option>
                                                                <option value="1984">1984</option>
                                                                <option value="1983">1983</option>
                                                                <option value="1982">1982</option>
                                                                <option value="1981">1981</option>
                                                                <option value="1980">1980</option>
                                                                </Field>
                                                                    {errors.year && touched.year ? (
                                                                            <p className="form-error">{errors.year}</p>
                                                                        ) : null }
                                                        </div>
                                                </div>
                                                </div>

                                                <div className="row">
                                                    
                                                    <div className="col-md-4">
                                                        <label className="form-label">New Password</label>
                                                        <div className="wrap-input100 validate-input input-group" id="Password-toggle">	
                                                            <div className="input-group-text bg-white text-muted" onClick={ ()=> setNewPassShow(!newPassShow)}>
                                                                {!newPassShow ? <i className='zmdi zmdi-eye text-muted' aria-hidden='true' style={{'cursor': 'pointer'}}></i> : <i className='fe fe-eye-off' style={{'cursor': 'pointer'}}></i>}
                                                            </div>											
                                                            <Field className="input100 form-control form-control-lg ms-0"  autoComplete='off'
                                                                type={!newPassShow ? "password" : "text"} 
                                                                placeholder="New Password" 
                                                                id='password'
                                                                name='password'
                                                                value={values.updatedPassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}	/>
                                                        </div>
                                                            {errors.password && touched.password ? (
                                                                    <p className="form-error">{errors.password}</p>
                                                                ) : null }
                                                    </div>
                                                    <div className="col-md-4">
                                                    <label className="form-label">Confirm Password</label>
                                                        <div className="wrap-input100 validate-input input-group" id="Password-toggle">	
                                                            <div className="input-group-text bg-white text-muted" onClick={ ()=> setConPassShow(!conPassShow)}>
                                                                {!conPassShow ? <i className='zmdi zmdi-eye text-muted' aria-hidden='true' style={{'cursor': 'pointer'}}></i> : <i className='fe fe-eye-off' style={{'cursor': 'pointer'}}></i>}
                                                            </div>											
                                                            <Field className="input100 form-control form-control-lg ms-0" autoComplete='off'
                                                                type={!conPassShow ? "password" : "text"} 
                                                                placeholder="Confirm Password" 
                                                                id='conPassword'
                                                                name='conPassword'
                                                                value={values.updatedConPassword}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}	/>
                                                        </div>
                                                            {errors.conPassword && touched.conPassword ? (
                                                                    <p className="form-error">{errors.conPassword}</p>
                                                                ) : null }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12 text-end">
                                                        <button className="btn btn-primary btn-lg"
                                                            type='submit'
                                                            name='Update_User'
                                                            id='Update_User'
                                                            value='Update_User'
                                                        >Update User</button>
                                                    </div>
                                                </div>
                                                <ToastContainer />
                                            </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ROW-1 CLOSED */}

                    </div>
                    {/*CONTAINER CLOSED */}

                </div>
            </div>
            {/*app-content open*/}
        </>
    )
}

export default Edit_UserProfile_page;

document.addEventListener('DOMContentLoaded', function() {
    $(document).on('change','#gender', function(){
        var gender =$(this).val();
        if( gender === null || gender === ""){
            $('p#genderForm_error').append('* plz select gender');
        }
        else{
            $('p#genderForm_error').empty();
        }        
    });
    
    $(document).on('click','#Add_User', function(){
        var gender =$('#gender').val();
        if( gender === ""){
            $('p#genderForm_error').append('* plz select gender');
        }
        else{
            $('p#genderForm_error').empty();
        }        
    });


    // Delete account

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

    //  Deactivate status of user

    $(document).on('click','#status_button', function(){
        var id =$(this).data('value');
        var name =$(this).data('name');
        var status =$(this).data('status');

        if( status === 'active'){
            Swal.fire({
                title: "Are you sure you want to deactivate " +name+ "?",
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, deactivate it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    userStatus(id);
                  Swal.fire(
                    'Deactivated!',
                    'This user has been deactivated.',
                    'success'
                  )
                }
              })
        }
        else{
            Swal.fire({
                title: "Are you sure you want to Activate " +name+ "?",
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, activate it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    userStatus(id);
                  Swal.fire(
                    'Activated!',
                    'This user has been activated.',
                    'success'
                  )
                }
              })
        }
        
    });

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
        var url = '/users_info';
        window.location.href = url;
    }

    // change user status
    
    const userStatus = async (id) => {
        try{
                
            const res = await fetch(`${serverUrl}/user_status/`+id, {
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
                toast.success('User Status Updated successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored"
                    });
                    
                    setTimeout(reloadUserPage, 3000);
            }
        
        } catch(err) {
            window.alert(err);
        }
        }

        function reloadUserPage() {
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