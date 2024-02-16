import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import {signInSchema} from '../../schemas';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../../Router';

const serverUrl = 'http://localhost:5000';

const AdminSignIn_page = () => {

	const {state, dispatch} = useContext(UserContext);

	console.log(state);

	const history = useNavigate();

	const [passShow, setPassshow] = useState(false);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const PostData = async (event) => {
		const Data = event;
		const { email, password } = Data;

		const res = await fetch(`${serverUrl}/admin_Signin`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			credentials: 'include',
			body: JSON.stringify({
				email, password
			})
		});

		const data = await res.json();
		if (data === 400 || !data){
			toast.error("Plz fill the required data", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });
		} else if (data === 401 || !data){
			toast.error("Invalid Credentails!", {
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
			dispatch({ type: "senior admin", payload: data.users });

			toast.success('Sign In successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
                });

			history("/dashboard");
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
									<h3 className='text-white mt-2'>admin</h3>
								</div>
							</div>

							<div className="col-lg-6 col-md-12 container-login100">
								<div className="wrap-login100 p-8">

								<Formik
									initialValues = {{
										email: "", password: ""
									}}
									validationSchema={signInSchema}
									onSubmit={
											(values, actions) =>{
												PostData(values);
												actions.resetForm();
											}
									}
									
								>
									{({ isSubmitting, values, errors, touched, handleBlur, handleChange }) => (
									<Form method="POST" className="login100-form validate-form">
										<span className="login100-form-title pb-0">
											Sign In
										</span>
										<label className="login-social-icon"><span>Admin</span></label>
										<div className="panel panel-primary">
											<div className="panel-body tabs-menu-body p-0 pt-5">
												<div className="tab-content">
													<div className="tab-pane active">
														<div className="wrap-input100 validate-input input-group mb-5" data-bs-validate="Valid email is required: ex@abc.xyz">
															
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

														<div className="wrap-input100 validate-input input-group" id="Password-toggle">
															
															<Field className="input100 form-control form-control-lg ms-0" 
																type={!passShow ? "password" : "text"} 
																placeholder="Password"
																id='password'
																name='password'
																value={values.password}
																onChange={handleChange}
                                                                onBlur={handleBlur}															
																style={{'borderRight': '0px'}}
															/>

															<div className="input-group-text bg-white text-muted" onClick={ ()=> setPassshow(!passShow)}>
																{!passShow ? <i className='zmdi zmdi-eye text-muted' aria-hidden='true'></i> : <i className='fe fe-eye-off'></i>}
															</div>
														</div>
															{errors.password && touched.password ? (
																<p className="form-error">{errors.password}</p>
															) : null }

														<div className="text-end pt-4">
															<p className="mb-0"><a href="admin_ForgotPass" className="text-primary ms-1">Forgot Password?</a></p>
														</div>
														<div className="container-login100-form-btn">
															<Field className="login100-form-btn "
																	name='signin'
																	type='submit'
																	id='signin'
																	value='Sign In'
															/>
														</div>
														<div className="text-center pt-3">
															<p className="text-dark mb-0">Not a member?<a href="admin_Signup" className="text-primary ms-1">Sign UP</a></p>
														</div>
														<label className="login-social-icon"><span>Login with Social</span></label>
														<div className="d-flex justify-content-center">
																<a href="#">
																	<div className="social-login me-4 text-center">
																		<i className="fa fa-google"></i>
																	</div>
																</a>
																<a href="#">
																	<div className="social-login me-4 text-center">
																		<i className="fa fa-facebook"></i>
																	</div>
																</a>
																<a href="#">
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
    
export default AdminSignIn_page;