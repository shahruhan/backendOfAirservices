import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from 'react-router-dom';
import { Formik, Field, Form } from "formik";
import {addCustomerSchema} from '../schemas';
import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const serverUrl = 'http://localhost:5000';



const EditCustomer_page = () => {

    const history = useNavigate();

    const {id} = useParams();
    

    const [userData, setUserData] = useState('');

    const [customerData, setCustomerData] = useState({
        c_name:"", c_contact:"", c_gender:"", c_address:"", c_ticket_from:"", c_ticket_no:"", c_relation:"", c_details:"",
        c_company:"", c_nights:"", c_roomType:"", c_passport:"", c_airline:"", c_PNR:"", c_voucher_no:"", c_packagePrices:"",
        c_Visa :"", c_Vaccine:"", c_Ticket:"", c_Voucher:"", c_transaction:"", c_blanceAmount:"", c_receivingDate:"", c_travelDate:""
    });

    const callAddCustomerPage = async () =>{
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


    const callEditCustomerPage = async () =>{
        try{
            
            const res = await fetch(`${serverUrl}/edit_Customer/`+id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });
            const data = await res.json();

            setCustomerData(data);

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
        callAddCustomerPage();
        callEditCustomerPage();
    }, []);


    //storing data in data base in using states

    const PostData = async (event) =>{

		const Data = event;
		const { _id, c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
                c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
                c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate
            } = Data;

		const res = await fetch(`${serverUrl}/edit_customer`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				_id, c_name, c_contact, c_gender, c_address, c_ticket_from, c_ticket_no, c_relation, c_details,
                c_company, c_nights, c_roomType, c_passport, c_airline, c_PNR, c_voucher_no, c_packagePrices,
                c_Visa , c_Vaccine, c_Ticket, c_Voucher, c_transaction, c_blanceAmount, c_receivingDate, c_travelDate
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
			toast.success('Customer data updated successfully!', {
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
                            <h1 className="page-title"></h1>
                            <div>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active" aria-current="page">Edit Customer Info</li>
                                </ol>
                            </div>
                        </div>
                        {/* PAGE-HEADER END */}


                        {/*Row */}
                        <div className="row">
                            <div className="col-md-12 col-xl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Edit Customer Information</h3>
                                    </div>
                                    <div className="card-body">
                                    <Formik
                                            enableReinitialize
                                            initialValues = {
                                                customerData
                                            }
                                            validationSchema={addCustomerSchema}
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
                                                // values = {
                                                //     ...customerData
                                                // },
                                            <Form method="POST">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field id="c_name" placeholder="Customer Name" autoComplete="username" style={{'textTransform': 'capitalize'}} className="form-control"
                                                                    type="text"
                                                                    name='c_name'
                                                                    value={values.c_name}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     />
                                                                <label htmlFor="c_name">Customer Name</label>
                                                                {errors.c_name && touched.c_name ? (
                                                                    <p className="form-error">{errors.c_name}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field id="c_contact" placeholder="Contact" autoComplete="username" className="form-control"
                                                                    type="text"
                                                                    name='c_contact'
                                                                    value={values.c_contact}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    
                                                                />
                                                                {/* <p className="form-error" id="contactForm_error"></p> */}
                                                                <label htmlFor="c_contact">Contact</label>
                                                                {errors.c_contact && touched.c_contact ? (
                                                                    <p className="form-error">{errors.c_contact}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            {/* <label className="form-label m-0">Gender</label> */}
                                                            <Field as="select" className="form-control form-select" id="c_gender" aria-label="Default select example"
                                                                name="c_gender"
                                                                value={values.c_gender}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option> 
                                                                <option value="infant">Infant</option> 
                                                            </Field>
                                                                    <p className="form-error" id="genderForm_error"></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_address" placeholder="Address" autoComplete="username"
                                                                    type="text"
                                                                    name='c_address'
                                                                    value={values.c_address}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    
                                                                />
                                                                <label htmlFor="c_address">Address</label>
                                                                {errors.c_address && touched.c_address ? (
                                                                    <p className="form-error">{errors.c_address}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_ticket_from" placeholder="Ticket From" autoComplete="username"
                                                                    type="text"
                                                                    name='c_ticket_from'
                                                                    value={values.c_ticket_from}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                      
                                                                />
                                                                <label htmlFor="c_ticket_from">Ticket From/ Flight</label>
                                                                {errors.c_ticket_from && touched.c_ticket_from ? (
                                                                    <p className="form-error">{errors.c_ticket_from}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_ticket_no" placeholder="Ticket Number" autoComplete="username"
                                                                    type="text"
                                                                    name='c_ticket_no'
                                                                    value={values.c_ticket_no}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_ticket_no">Ticket Number</label>
                                                                {errors.c_ticket_no && touched.c_ticket_no ? (
                                                                    <p className="form-error">{errors.c_ticket_no}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_relation" placeholder="Relation" autoComplete="username"
                                                                    type="text"
                                                                    name='c_relation'
                                                                    value={values.c_relation}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_relation">Relation</label>
                                                                {errors.c_relation && touched.c_relation ? (
                                                                    <p className="form-error">{errors.c_relation}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_details" placeholder="details" autoComplete="username"
                                                                    type="text"
                                                                    name='c_details'
                                                                    value={values.c_details}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_details">Details</label>
                                                                {errors.c_details && touched.c_details ? (
                                                                    <p className="form-error">{errors.c_details}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_nights" placeholder="Nights" autoComplete="username"
                                                                    type="text"
                                                                    name='c_nights'
                                                                    value={values.c_nights}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_nights">Nights</label>
                                                                {errors.c_nights && touched.c_nights ? (
                                                                    <p className="form-error">{errors.c_nights}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <Field as="select" className="form-control form-select" aria-label="Default select example"
                                                                    name="c_roomType"
                                                                    value={values.c_roomType}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    
                                                                >
                                                                    <option value>Select Room Type</option>
                                                                    <option value="No Bed">No Bed</option>
                                                                    <option value="2 Bed">2 Bed</option>
                                                                    <option value="3 Bed">3 Bed</option>
                                                                    <option value="Quad">Quad</option>
                                                                    <option value="5 Bed">5 Bed</option>
                                                                    <option value="6 Bed">6 Bed</option>
                                                                    <option value="No ACC">No ACC</option>
                                                                    <option value="Self">Self</option>
                                                                    <option value="Sharing">Sharing</option> 
                                                                </Field>
                                                                {errors.c_roomType && touched.c_roomType ? (
                                                                        <p className="form-error">{errors.c_roomType}</p>
                                                                    ) : null }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_passport" placeholder="Passport No." autoComplete="username"
                                                                    type="text"
                                                                    name='c_passport'
                                                                    value={values.c_passport}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_passport">Passport No.</label>
                                                                {errors.c_passport && touched.c_passport ? (
                                                                        <p className="form-error">{errors.c_passport}</p>
                                                                    ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_airline" placeholder="Air Line" autoComplete="username"
                                                                    type="text"
                                                                    name='c_airline'
                                                                    value={values.c_airline}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_airline">Air Line</label>
                                                                {errors.c_airline && touched.c_airline ? (
                                                                    <p className="form-error">{errors.c_airline}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_PNR" placeholder="PNR No." autoComplete="username"
                                                                    type="text"
                                                                    name='c_PNR'
                                                                    value={values.c_PNR}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_PNR">PNR</label>
                                                                {errors.c_PNR && touched.c_PNR ? (
                                                                        <p className="form-error">{errors.c_PNR}</p>
                                                                    ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_packagePrices" placeholder="Package Prices" autoComplete="username"
                                                                    type="text"
                                                                    name='c_packagePrices'
                                                                    value={values.c_packagePrices}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_packagePrices">Package Prices</label>
                                                                {errors.c_packagePrices && touched.c_packagePrices ? (
                                                                    <p className="form-error">{errors.c_packagePrices}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_transaction" placeholder="Transaction" autoComplete="username"
                                                                    type="text"
                                                                    name='c_transaction'
                                                                    value={values.c_transaction}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_transaction">Transaction</label>
                                                                {errors.c_transaction && touched.c_transaction ? (
                                                                    <p className="form-error">{errors.c_transaction}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_blanceAmount" placeholder="Balance Amount" autoComplete="username"
                                                                    type="text"
                                                                    name='c_blanceAmount'
                                                                    value={values.c_blanceAmount}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_blanceAmount">Balance Amount</label>
                                                                {errors.c_blanceAmount && touched.c_blanceAmount ? (
                                                                    <p className="form-error">{errors.c_blanceAmount}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_voucher_no" placeholder="Voucher No." autoComplete="username"
                                                                    type="text"
                                                                    name='c_voucher_no'
                                                                    value={values.c_voucher_no}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_voucher_no">Voucher No.</label>
                                                                {errors.c_voucher_no && touched.c_voucher_no ? (
                                                                        <p className="form-error">{errors.c_voucher_no}</p>
                                                                    ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <div className="form-floating">
                                                                <Field className="form-control" id="c_company" placeholder="Company" autoComplete="username"
                                                                    type="text"
                                                                    name='c_company'
                                                                    value={values.c_company}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                     
                                                                />
                                                                <label htmlFor="c_company">Company</label>
                                                                {errors.c_company && touched.c_company ? (
                                                                    <p className="form-error">{errors.c_company}</p>
                                                                ) : null }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        <label htmlFor="c_Visa" className="mb-0 ps-2">Visa</label>
                                                            <Field as="select" className="form-control form-select" id="c_Visa" aria-label="Default select example" style={{'height': '2.575rem'}}
                                                                name="c_Visa"
                                                                value={values.c_Visa}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                
                                                            >
                                                                <option value="" disabled  defaultValue>Visa</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </Field>
                                                            
                                                                    <p className="form-error" id="VisaForm_error"></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        <label htmlFor="c_Vaccine" className="mb-0 ps-2">Vaccine</label>
                                                            <Field as="select" className="form-control form-select" id="c_Vaccine" aria-label="Default select example" style={{'height': '2.575rem'}}
                                                                name="c_Vaccine"
                                                                value={values.c_Vaccine}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                
                                                            >
                                                                <option value="" disabled  defaultValue>Vaccine</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </Field>
                                                                    <p className="form-error" id="VaccineForm_error"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        <label htmlFor="c_Ticket" className="mb-0 ps-2">Ticket</label>
                                                            <Field as="select" className="form-control form-select" id="c_Ticket" aria-label="Default select example" style={{'height': '2.575rem'}}
                                                                name="c_Ticket"
                                                                value={values.c_Ticket}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                
                                                            >
                                                                <option value="" disabled  defaultValue>Ticket</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </Field>
                                                                    <p className="form-error" id="TicketForm_error"></p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        <label htmlFor="c_Voucher" className="mb-0 ps-2">Voucher</label>
                                                            <Field as="select" className="form-control form-select" id="c_Voucher" aria-label="Default select example" style={{'height': '2.575rem'}}
                                                                name="c_Voucher"
                                                                value={values.c_Voucher}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                
                                                            >
                                                                <option value="" disabled  defaultValue>Voucher</option>
                                                                <option value="Yes">Yes</option>
                                                                <option value="No">No</option>
                                                            </Field>
                                                                    <p className="form-error" id="VoucherForm_error"></p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <label className="form-label m-0">Receiving Date</label>
                                                        <div className="input-group">
                                                            <div className="input-group-text">
                                                                <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                            </div>
                                                            <Field className="form-control" id="c_receivingDate" placeholder="MM/DD/YYYY"
                                                                type="date"
                                                                name='c_receivingDate'
                                                                value={values.c_receivingDate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                 
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label className="form-label m-0">Travel Date</label>
                                                        <div className="input-group">
                                                            <div className="input-group-text">
                                                                <i className="fa fa-calendar tx-16 lh-0 op-6"></i>
                                                            </div>
                                                            {/* <Form.Control className="form-control" placeholder="MM/DD/YYYY"
                                                                type="date"
                                                                name='c_travelDate'
                                                                value={values.c_travelDate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                
                                                            /> */}
                                                            <Field className="form-control" id="c_travelDate" placeholder=" DD/MM/YYYY"
                                                                type="date"
                                                                name='c_travelDate'
                                                                value={values.c_travelDate}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                 
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row mt-7">
                                                    <div className="col-md-12 text-center">
                                                        <button className="btn btn-primary btn-lg"
                                                            type='submit'
                                                            name='Add_Customer'
                                                            id='Add_Customer'
                                                            value='Add_Customer'
                                                        >Submit form</button>
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
                        {/*End Row*/}

                    </div>
                    {/* CONTAINER CLOSED */}

                </div>
            </div>
            {/*app-content closed*/}
        </>
    )
}

export default EditCustomer_page;

document.addEventListener('DOMContentLoaded', function() {
    $(document).on('change','#c_gender', function(){
        var gender =$(this).val();
        if( gender === null || gender === ""){
            $('p#genderForm_error').append('* plz select gender');
        }
        else{
            $('p#genderForm_error').empty();
        }        
    });
    
    $(document).on('click','#Add_Customer', function(){
        var c_gender =$('#c_gender').val();
        if( c_gender === ""){
            $('p#genderForm_error').append('* plz select gender');
        }
        else{
            $('p#genderForm_error').empty();
        }        
    });
});