import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import {adminRegisterSchema} from '../../schemas';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:5000';
 
const AdminRegister_page = () => {

	const history = useNavigate();

	const [passShow, setPassshow] = useState(false);
	const [conPassShow, setConPassShow] = useState(false);

	const [user, setUser] = useState({
		name: "", email: "", contact: "", password: "", conPassword: ""
	});

	const PostData = async (event) =>{
		const Data = event;
		const { name, email, contact, password, conPassword } = Data;

		const res = await fetch(`${serverUrl}/admin_register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name, email, contact, password, conPassword
			})
		});

		const data = await res.json();
		
		if (data === 421 || !data){
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
		} else if (data === 422 || !data){
			toast.error('User already exist!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
		} else if (data === 423 || !data){
			toast.error("Password and Confirm password do not match!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
		} else{
			toast.success('User registered successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
			setTimeout( history("/admin_Signin"), 5000);
		}
	}

    return(
        <>
			<div className="app sidebar-mini ltr login-img">
				{/*begin::Authentication - Sign-in */}
				{/* BACKGROUND-IMAGE */}
    			<div className="">
        			{/* PAGE */}
        			<div className="page">
            			<div className="row">

							{/* CONTAINER OPEN */}
							<div className="col-lg-6 col-md-12 col-login" style={{'display':'flex', 'flexDirection': 'column', 'justifyContent': 'space-around'}}>
								<div className="m-auto">
									<img src="images/brand/logo-white.png" className="header-brand-img" alt=""/>
									<h3 className='text-white mt-2'>Babul Madina Air Services</h3>
								</div>
							</div>

							<div className="col-lg-6 col-md-12 container-login100">
								<div className="wrap-login100 p-8">

								<Formik
									initialValues = {{
										name: "", email: "", contact: "", password: "", conPassword: ""
									}}
									validationSchema={adminRegisterSchema}
									onSubmit={
											(values, actions) =>{
												PostData(values);
												actions.resetForm();
											}
									}
									
								>
									{({ isSubmitting, values, errors, touched, handleBlur, handleChange }) => (
									<Form method="POST" className="login100-form validate-form" id='registration_form'>
										<span className="login100-form-title pb-0">
											Sign Up
										</span>
										<label className="login-social-icon"><span>Admin</span></label>
										<div className="panel panel-primary">
											<div className="panel-body tabs-menu-body p-0 pt-5">
												<div className="tab-content">
													<div className="tab-pane active">

                                                        <div className="wrap-input100 validate-input input-group" data-bs-validate="Name is required">
															<Field className="input100 form-control form-control-lg ms-0" 
																type="text" 
																placeholder="Name"
																id='name'
																name='name'
																value={values.name}
																onChange={handleChange}
                                                                onBlur={handleBlur}
															/>
														</div>
														{errors.name && touched.name ? (
                                                                    <p className="form-error">{errors.name}</p>
                                                                ) : null }

														<div className="wrap-input100 validate-input input-group" data-bs-validate="Valid email is required: ex@abc.xyz">
															<Field className="input100 form-control form-control-lg ms-0" 
																type="email" 
																placeholder="Email"
																id='email'
																name='email'
																value={values.email}
																onChange={handleChange}
                                                                onBlur={handleBlur}															
															/>
														</div>
														{errors.email && touched.email ? (
                                                                    <p className="form-error">{errors.email}</p>
                                                                ) : null }

                                                        <div className="wrap-input100 validate-input input-group" data-bs-validate="Phone Number is required">
															<Field className="input100 form-control form-control-lg ms-0" 
																type="text" 
																placeholder="contact"
																id='contact'
																name='contact'
																value={values.contact}
																onChange={handleChange}
                                                                onBlur={handleBlur}	
															/>
														</div>
															{errors.contact && touched.contact ? (
                                                                    <p className="form-error">{errors.contact}</p>
                                                                ) : null }

														<div className="wrap-input100 validate-input input-group" id="Password-toggle">															
															<Field className="input100 form-control form-control-lg ms-0" 
																type={!passShow ? "password" : "text"} 
																placeholder="Password" 
																id='password'
																name='password'
																value={values.password}
																onChange={handleChange}
                                                                onBlur={handleBlur}	

															style={{'borderRight': '0px'}}/>
															<div className="input-group-text bg-white text-muted" onClick={ ()=> setPassshow(!passShow)}>
																{!passShow ? <i className='zmdi zmdi-eye text-muted' aria-hidden='true'></i> : <i className='fe fe-eye-off'></i>}
															</div>
														</div>
															{errors.password && touched.password ? (
                                                                    <p className="form-error">{errors.password}</p>
                                                                ) : null }

                                                        <div className="wrap-input100 validate-input input-group" id="conPassword-toggle">															
															<Field className="input100 form-control form-control-lg ms-0" 
																type={!conPassShow ? "password" : "text"} 
																placeholder="Confirm Password" 
																id='conPassword'
																name='conPassword'
																value={values.conPassword}
																onChange={handleChange}
                                                                onBlur={handleBlur}	
															style={{'borderRight': '0px'}}/>
															<div className="input-group-text bg-white text-muted" onClick={ ()=> setConPassShow(!conPassShow)}>
																{!conPassShow ? <i className='zmdi zmdi-eye text-muted' aria-hidden='true'></i> : <i className='fe fe-eye-off'></i>}
															</div>
														</div>
															{errors.conPassword && touched.conPassword ? (
                                                                    <p className="form-error">{errors.conPassword}</p>
                                                                ) : null }

														<div className="container-login100-form-btn">
															<Field className="login100-form-btn "
																type='submit'
																name='register'
																id='register'
																value='register'
															/>
														</div>

														<div className="text-center pt-3">
															<p className="text-dark mb-0">Already have an Account?<a href="/admin" className="text-primary ms-1">Sign In</a></p>
														</div>
														<label className="login-social-icon"><span>SignUp with Social</span></label>
														<div className="d-flex justify-content-center">
																<a href="javascript:void(0)">
																	<div className="social-login me-4 text-center">
																		<i className="fa fa-google"></i>
																	</div>
																</a>
																<a href="javascript:void(0)">
																	<div className="social-login me-4 text-center">
																		<i className="fa fa-facebook"></i>
																	</div>
																</a>
																<a href="javascript:void(0)">
																	<div className="social-login text-center">
																		<i className="fa fa-twitter"></i>
																	</div>
																</a>
														</div>
													</div>
												</div>
											</div>
                            			</div>
										<ToastContainer />
									</Form>
										)}
									</Formik>

                    			</div>
                			</div>
                			{/* CONTAINER CLOSED */}
            			</div>
        			</div>
        			{/* End PAGE */}

    			</div>
    			{/* BACKGROUND-IMAGE CLOSED */}
				{/*end::Authentication - Sign-in*/}
			</div>

        </>
    )
}
    
export default AdminRegister_page;