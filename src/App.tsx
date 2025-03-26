import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Admin } from "./components/Admin/Admin";
import ReferralForm from "./components/Referrals";
// import { LoginForm } from "./components/LoginForm";
// import { AuthProvider } from "./components/AuthContext";
// import PrivateRoute from "./ProtectedRoute";

function App() {
  return (
    // <AuthProvider>
      <BrowserRouter>
        <div className="bg-gray-100 min-h-screen py-6">
          {/* Navbar */}
          <nav className="flex gap-4 px-6 mb-6">
            <Link to="/" className="text-blue-600 hover:underline">Referral Form</Link>
            <Link to="/admin" className="text-blue-600 hover:underline">Admin Panel</Link>
          </nav>

          <Routes>
            <Route path="/" element={<ReferralForm />} />
            {/* <Route path="/login" element={<LoginForm />} /> */}
            {/* Protected Routes */}
            {/* <Route element={<PrivateRoute />}> */}
              <Route path="/admin" element={<Admin />} />
            {/* </Route> */}
          </Routes>
        </div>
      </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
