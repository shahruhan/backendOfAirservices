import React from 'react';
 
const UserSignIn_page = () => {
    return(
        <>
			<div class="app sidebar-mini ltr login-img">
				{/*begin::Authentication - Sign-in */}
				{/* BACKGROUND-IMAGE */}
    			<div class="">
        			{/* PAGE */}
        			<div class="page">
            			<div class="row">

							{/* CONTAINER OPEN */}
							<div class="col-lg-6 col-md-12 col-login" style={{'display':'flex', 'flexDirection': 'column', 'justifyContent': 'space-around'}}>
								<div class="m-auto">
									<img src="images/brand/logo-white.png" class="header-brand-img" alt=""/>
									<h3 className='text-white mt-2'>user</h3>
								</div>
							</div>

							<div class="col-lg-6 col-md-12 container-login100">
								<div class="wrap-login100 p-8">
									<form class="login100-form validate-form">
										<span class="login100-form-title pb-0">
											Sign In
										</span>
										<label class="login-social-icon"><span>Users</span></label>
										<div class="panel panel-primary">
											<div class="panel-body tabs-menu-body p-0 pt-5">
												<div class="tab-content">
													<div class="tab-pane active">
														<div class="wrap-input100 validate-input input-group mb-5" data-bs-validate="Valid email is required: ex@abc.xyz">
															
															<input class="input100 form-control form-control-lg ms-0" type="email" placeholder="Email"/>
														</div>
														<div class="wrap-input100 validate-input input-group" id="Password-toggle">
															
															<input class="input100 form-control form-control-lg ms-0" type="password" placeholder="Password" style={{'borderRight': '0px'}}/>
															<a href="javascript:void(0)" class="input-group-text bg-white text-muted">
																<i class="zmdi zmdi-eye text-muted" aria-hidden="true"></i>
															</a>
														</div>
														{/* <div class="text-end pt-4">
															<p class="mb-0"><a href="user_ForgotPass" class="text-primary ms-1">Forgot Password?</a></p>
														</div> */}
														<div class="container-login100-form-btn">
															<a href="/" class="login100-form-btn ">
																	Login
															</a>
														</div>
														{/* <div class="text-center pt-3">
															<p class="text-dark mb-0">Not a member?<a href="user_Signup" class="text-primary ms-1">Sign UP</a></p>
														</div> */}
														<label class="login-social-icon"><span>Login with Social</span></label>
														<div class="d-flex justify-content-center">
																<a href="javascript:void(0)">
																	<div class="social-login me-4 text-center">
																		<i class="fa fa-google"></i>
																	</div>
																</a>
																<a href="javascript:void(0)">
																	<div class="social-login me-4 text-center">
																		<i class="fa fa-facebook"></i>
																	</div>
																</a>
																<a href="javascript:void(0)">
																	<div class="social-login text-center">
																		<i class="fa fa-twitter"></i>
																	</div>
																</a>
														</div>
													</div>
												</div>
											</div>
                            			</div>
                        			</form>
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
    
export default UserSignIn_page;