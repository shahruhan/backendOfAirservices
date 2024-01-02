import React, { createContext, useReducer } from "react";
import { Routes , Route} from "react-router-dom";
// import {BrowserRouter as Router} from 'react-router';
import Error from "./Error";
import Home from "./app_component/Home";
import CustomerInfo from "./app_component/CustomerInfo";
import Add_customer from "./app_component/Add_customer";
import Edit_customer from "./app_component/Edit_customer";
// import Profile from "./app_component/Profile";
// import EditProfile from "./app_component/EditProfile";
import Users_Info from "./app_component/Users_Info";
import UserProfile from "./app_component/UserProfile";
import Add_UserProfile from "./app_component/Add_UserProfile";
import Edit_UserProfile from "./app_component/Edit_UserProfile";
import AdminSignIn from "./app_component/app_authentication/AdminSignIn";
import AdminRegister from "./app_component/app_authentication/AdminRegister";
import AdminForgotPass from "./app_component/app_authentication/AdminForgotPass";
import UserSignIn from "./app_component/app_authentication/UserSignIn";
// import UserRegister from "./app_component/app_authentication/UserRegister";
import UserForgotPass from "./app_component/app_authentication/UserForgotPass";
import Logout from "./components/authentication_components/Logout_page";
import { initialState, reducer } from "./reducer/useReducer";

export const UserContext = createContext();

const Routing = () => {
    return (
        <Routes>
            <Route exact  path="/dashboard" element={<Home/>} />
            <Route  path="/customer_info" element={<CustomerInfo/>} />
            <Route  path="/add_customer" element={<Add_customer/>} />
            <Route  path="/edit_customer/:id" element={<Edit_customer/>} />
            {/* <Route  path="/profile" element={<Profile/>} /> */}
            {/* <Route  path="/editProfile" element={<EditProfile/>} /> */}
            <Route  path="/users_info" element={<Users_Info/>} />
            <Route  path="/user_profile/:id" element={<UserProfile/>} />
            <Route  path="/add_UserProfile" element={<Add_UserProfile/>} />
            <Route  path="/edit_User/:id" element={<Edit_UserProfile/>} />
            <Route  path="/admin" element={<AdminSignIn/>} />
            <Route  path="/admin_Signup" element={<AdminRegister/>} />
            <Route  path="/admin_ForgotPass" element={<AdminForgotPass/>} />
            <Route  path="/" element={<UserSignIn/>} />
            {/* <Route  path="/user_Signup" element={<UserRegister/>} /> */}
            {/* <Route  path="/user_ForgotPass" element={<UserForgotPass/>} /> */}
            <Route  path="/logout" element={<Logout/>} />
            <Route  path="/" element={<Error/>} />
        </Routes>
    )
}


const Router = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return(
        <>

        <UserContext.Provider value={{state, dispatch}}>
            <Routing />
        </UserContext.Provider>

        
        </>
    );
}

export default Router;