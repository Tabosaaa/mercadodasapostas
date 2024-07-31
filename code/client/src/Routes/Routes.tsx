import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import LandingPage from "../pages/LandingPage";

const RoutesApp: React.FC = () => {
    return (
        <Router> 
        <Routes>
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/" element={<LandingPage />} />
        </Routes>
    </Router>
    );
}

export default RoutesApp;
