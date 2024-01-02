import React, { useEffect, useState } from "react";
import {useNavigate, NavLink, useLocation} from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:5000';
 
const CustomerInfo_page = () => {

    const history = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [userData, setUserData] = useState('');
    const [customerData, setCustomerData] = useState([]);
 
    const callCustomerInfoPage = async () =>{
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

    const callCustomerInfoData = async () =>{
        
        try{

            const response = await fetch(`${serverUrl}/customerInfo`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });

            const resData = await response.json();

            if (resData.length > 0){
                  setCustomerData(resData);
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
        callCustomerInfoPage();
        callCustomerInfoData();
    }, []);
    

    let id = 0;
    var packagePrices = 0;
    var transaction = 0;
    var blanceAmount = 0;

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
                                    <li className="breadcrumb-item active" aria-current="page">Customer Info</li>
                                </ol>
                            </div>

                        </div>
                        {/*  PAGE-HEADER END */}




                        {/*  Row */}
                        <div className="row row-sm">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Customer Information</h3>
                                        <div className="add_btn">
                                            <a href='/add_customer' type="button" className="btn btn-primary btn-sm btn-block">Add New Customer</a>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="file-datatable" className="table table-bordered table-hover text-nowrap key-buttons border-bottom">
                                                <thead>
                                                    <tr>
                                                        <th>S.No#</th>
                                                        <th>RECEVING DATE</th>
                                                        <th>CUSTOMER NAME</th>
                                                        <th>DETAILS</th>
                                                        <th>PASSPORT NO.</th>
                                                        <th>AIRLINE</th>
                                                        <th>PNR</th>
                                                        <th>PACKAG PRICES</th>
                                                        <th>TRANSACTION</th>
                                                        <th>BALANCE AMOUNT</th>
                                                        <th>TICKET No. </th>
                                                        <th>VOUCHER No. </th>
                                                        <th>TRAVEL DATE</th>
                                                        <th>TICKET FROM</th>
                                                        <th>COMPANY</th>
                                                        <th>RELATION</th>
                                                        <th>NIGHTS</th>
                                                        <th>ROOOM TYPE</th>
                                                        <th>CONTACT No. </th>
                                                        <th>ADDRESS</th>
                                                        <th>GENDER</th>
                                                        <th>VISA</th>
                                                        <th>VACCINE</th>
                                                        <th>TICKET</th>
                                                        <th>VOUCHER</th>
                                                        <th>ACTIONS</th>
                                                    </tr>
                                                </thead>
                                                   
                                                   <tbody>
                                                {
                                                    
                                                    customerData.map( (currentData) => {

                                                        const {_id, c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
                                                                c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
                                                                c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate 
                                                            } = currentData;

                                                        id = id+1;
                                                        
                                                        packagePrices =  packagePrices + parseInt(c_packagePrices);
                                                        transaction =  transaction + parseInt(c_transaction);
                                                        blanceAmount =  blanceAmount + parseInt(c_blanceAmount);
                                                
                                                        return(
                                                        <tr key={id}>
                                                                <td>{id}</td>
                                                                <td>{c_receivingDate}</td>
                                                                <td style={{'textTransform': 'capitalize'}}>{c_name}</td>
                                                                <td>{c_details}</td>
                                                                <td>{c_passport}</td>
                                                                <td>{c_airline}</td>
                                                                <td>{c_PNR}</td>
                                                                <td>{c_packagePrices}</td>
                                                                <td>{c_transaction}</td>
                                                                <td>{c_blanceAmount}</td>
                                                                <td>{c_ticket_no}</td>
                                                                <td>{c_voucher_no}</td>
                                                                <td>{c_travelDate}</td>
                                                                <td>{c_ticket_from}</td>
                                                                <td>{c_company}</td>
                                                                <td>{c_relation}</td>
                                                                <td>{c_nights}</td>
                                                                <td>{c_roomType}</td>
                                                                <td>{c_contact}</td>
                                                                <td>{c_address}</td>
                                                                <td>{c_gender}</td>
                                                                <td>{c_Visa}</td>
                                                                <td>{c_Vaccine}</td>
                                                                <td>{c_Ticket}</td>
                                                                <td>{c_Voucher}</td>
                                                                <td>
                                                                    <NavLink to={`/edit_customer/${_id}`} className='btn tbl-action-edit p-0'><span className="fe fe-edit"> </span></NavLink>
                                                                    <button className='btn tbl-action-dlt p-0' id="delete_button" value={`${_id}`} data-name={c_name}><span className="fe fe-trash-2"> </span></button>
                                                                </td>
                                                        </tr>
                                                        )
                                                
                                                    })
                                                }
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>TOTAL</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th>{packagePrices}</th>
                                                        <th>{transaction}</th>
                                                        <th>{blanceAmount}</th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                        <th></th>
                                                    </tr>
                                                </tfoot>
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
            <ToastContainer />
        </>
    )
}
 
export default CustomerInfo_page;


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
                    deleteCustomer(id);
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
            if (path === '/customer_info'){
                $('body').addClass('sidenav-toggled');
            }
         }
         
        setLocation();
        
});


const deleteCustomer = async (id) => {
    // alert('clicked')
    try{
            
        const res = await fetch(`${serverUrl}/delete_Customer/`+id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
             credentials: 'include'
        });
        const data = await res.json();

        // setCustomerData(data);

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
            toast.success('Customer data deleted successfully!', {
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

