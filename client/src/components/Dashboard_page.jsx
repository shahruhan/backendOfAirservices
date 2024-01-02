import React, { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';

const serverUrl = 'http://localhost:5000';

const Dashboard_page = () => {

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
    reloadPage();

    const history = useNavigate();
    const [userData, setUserData] = useState('');
    const [customerData, setCustomerData] = useState([]);
 
    const callDashboardPage = async () =>{
        try{

            const res = await fetch(`${serverUrl}/dashboard`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });
            const data = await res.json();
            setUserData(data.rootUser);
            setCustomerData(data.rootCustomer);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch(err) {
            history("/admin_Signin");
        }
    }
    
    useEffect( () => {
        callDashboardPage();
    }, []);

    let total_customers = 0;
    var packagePrices =  0;
    var transaction =  0;
    var blanceAmount = 0;
    
   customerData.map( (currentData) => {
        const { c_packagePrices, c_transaction, c_blanceAmount} = currentData;

        total_customers = total_customers + 1;
        packagePrices =  packagePrices + parseInt(c_packagePrices);
        transaction =  transaction + parseInt(c_transaction);
        blanceAmount =  blanceAmount + parseInt(c_blanceAmount);

    });

    return(
        <>
        {/*app-content open*/}
        <div className="main-content app-content mt-0">
                <div className="side-app">

                    {/* CONTAINER */}
                    <div className="main-container container-fluid">

                        {/* <form method="GET"> */}

                        {/* PAGE-HEADER */}
                        <div className="page-header">
                            <h1 className="page-title">Dashboard</h1>
                            <div>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                        {/* PAGE-HEADER END */}

                        {/* ROW-1 */}
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                        <div className="card overflow-hidden">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="mt-2">
                                                        <h6 className="">Total Customers</h6>
                                                        <h2 className="mb-0 number-font">{total_customers}</h2>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="chart-wrapper mt-1">
                                                            <canvas id="saleschart"
                                                                className="h-8 w-9 chart-dropshadow"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <span className="text-muted fs-12"><span className="text-secondary"><i
                                                            className="fe fe-arrow-up-circle  text-secondary"></i> 5%</span>
                                                    Last week</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                        <div className="card overflow-hidden">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="mt-2">
                                                        <h6 className="">Total Package Price</h6>
                                                        <h2 className="mb-0 number-font">{packagePrices}</h2>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="chart-wrapper mt-1">
                                                            <canvas id="leadschart"
                                                                className="h-8 w-9 chart-dropshadow"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <span className="text-muted fs-12"><span className="text-pink"><i
                                                            className="fe fe-arrow-down-circle text-pink"></i> 0.75%</span>
                                                    Last 6 days</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                        <div className="card overflow-hidden">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="mt-2">
                                                        <h6 className="">Total Transaction</h6>
                                                        <h2 className="mb-0 number-font">{transaction}</h2>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="chart-wrapper mt-1">
                                                            <canvas id="profitchart"
                                                                className="h-8 w-9 chart-dropshadow"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <span className="text-muted fs-12"><span className="text-green"><i
                                                            className="fe fe-arrow-up-circle text-green"></i> 0.9%</span>
                                                    Last 9 days</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xl-3">
                                        <div className="card overflow-hidden">
                                            <div className="card-body">
                                                <div className="d-flex">
                                                    <div className="mt-2">
                                                        <h6 className="">Total Balance Amount</h6>
                                                        <h2 className="mb-0 number-font">{blanceAmount}</h2>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="chart-wrapper mt-1">
                                                            <canvas id="costchart"
                                                                className="h-8 w-9 chart-dropshadow"></canvas>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <span className="text-muted fs-12"><span className="text-warning"><i
                                                            className="fe fe-arrow-up-circle text-warning"></i> 0.6%</span>
                                                    Last year</span> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* ROW-1 END */}

                        {/* ROW-2 */}
                        <div className="row">

                            <div className="col-xl-3 col-sm-6 col-md-6">
                                <div className="card border p-0">
                                    <div className="card-body text-center welcome_profile">
                                    { !userData.profileImage ? <img alt="image" class="avatar avatar-xxl brround cover-image" src={process.env.PUBLIC_URL+"/images/user-icon/user-icon1.png"}/> : <img alt="image" class="avatar avatar-xxl brround cover-image" src={process.env.PUBLIC_URL+"/images/users/"+ userData.profileImage}/> }
                                        {/* <span className="avatar avatar-xxl brround cover-image" data-bs-image-src="images/users/15.jpg" style={{'background' : 'url(images/users/15.jpg) center center'}}></span> */}
                                        <h4 className="h4 mb-0 mt-3 text-white" style={ {'textTransform': 'capitalize'}  }>{ userData.name }</h4>
                                        <p className="card-text m-0" style={{'textTransform': 'capitalize'}}>{ userData.users }</p>
                                        <p className="card-text m-0">{ userData.email }</p>
                                        <h3 className="text-white mt-7">WELCOME BACK</h3>
                                    </div>
                                    <div className="card-footer text-center">
                                        <div className="row user-social-detail">
                                            <div className="social-profile me-4 rounded text-center">
                                                <a href="#"><i className="fa fa-google"></i></a>
                                            </div>
                                            <div className="social-profile me-4 rounded text-center">
                                                <a href="#"><i className="fa fa-facebook"></i></a>
                                            </div>
                                            <div className="social-profile me-4 rounded text-center">
                                                <a href="#"><i className="fa fa-twitter"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* COL END */}

                            <div className="col-xl-6 col-lg-12 col-md-12">
                                <div className="card overflow-hidden">
                                    <div className="card-header">
                                        <div>
                                            <h3 className="card-title">Locations</h3>
                                        </div>
                                    </div>
                                    <div className="card-body p-0 mt-2">
                                        <div className="">
                                            <div id="world-map-markers1" className="worldh world-map h-400 pb-5"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>{/* COL END */}

                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-3">
                                <div className="card overflow-hidden">
                                    <div className="card-body pb-0 bg-recentorder">
                                        <h3 className="card-title text-white">Recent Orders</h3>
                                        <div className="chartjs-wrapper-demo">
                                            <canvas id="recentorders" className="chart-dropshadow"></canvas>
                                        </div>
                                    </div>
                                    <div id="flotback-chart" className="flot-background"></div>
                                    <div className="card-body">
                                        <div className="d-flex mb-4 mt-3">
                                            <div
                                                className="avatar avatar-md bg-secondary-transparent text-secondary bradius me-3">
                                                <i className="fe fe-check"></i>
                                            </div>
                                            <div className="">
                                                <h6 className="mb-1 fw-semibold">Successful Deprture</h6>
                                                <p className="fw-normal fs-12"> <span className="text-success">3.5%</span>
                                                    increased </p>
                                            </div>
                                            <div className=" ms-auto my-auto">
                                                <p className="fw-bold fs-20"> 1,768 </p>
                                            </div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="avatar  avatar-md bg-pink-transparent text-pink bradius me-3">
                                                <i className="fe fe-x"></i>
                                            </div>
                                            <div className="">
                                                <h6 className="mb-1 fw-semibold">Cancelled Orders</h6>
                                                <p className="fw-normal fs-12"> <span className="text-success">1.2%</span>
                                                    increased </p>
                                            </div>
                                            <div className=" ms-auto my-auto">
                                                <p className="fw-bold fs-20 mb-0"> 3,675 </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* COL END */}
                        </div>
                        {/* ROW-2 END */}

                        {/* ROW-3 */}
                        <div className="row">
                            
                        </div>
                        {/* ROW-3 END */}

                        {/* </form> */}

                    </div>
                    {/* CONTAINER END */}
                </div>
            </div> 
            {/*app-content close*/}

        </>
    )
}

export default Dashboard_page;