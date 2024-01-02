import React, { useEffect, useState, useContext } from "react";
import {useNavigate} from 'react-router-dom';
import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../../Router';

const serverUrl = 'http://localhost:5000';
 
const Logout_page = () => {

    const {state, dispatch} = useContext(UserContext);

    const history = useNavigate();

    const callLogoutPage = async () =>{
        try{
            const res = await fetch(`${serverUrl}/logout`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                 credentials: 'include'
            });
            const data = await res.json();

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }

        } catch(err) {
            dispatch({ type: "senior admin", payload: false });
            history("/admin_Signin", {replace: true});
        }
    }
    
    useEffect( () => {
        callLogoutPage();
    }, []);


    return(
        <>
        <h1>welcome to react logout</h1>
        </>
    )
}
 
export default Logout_page;