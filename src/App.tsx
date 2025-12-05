import { UserCard } from "./components/common/UserCard"
import { Navbar } from "./components/layout/NavBar"
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";
import CvPage from "@/pages/CvPage";
import ContactPage from "@/pages/ContactPage";

import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import AdminCvPage from "@/pages/admin/AdminCvPage";

import { ProtectedRoute } from "@/router/ProtectedRoute";

function App() {

  
  

  return (
    <div>

     <Navbar></Navbar>
     <div className ="flex justify-center items-center pt-10">
      <UserCard ></UserCard></div>
      <Routes>
          {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin login public */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

         {/* Protected admin routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/cv" element={<AdminCvPage />} />
            
          </Route>


        
      </Routes>
     
    </div>
  )
}

export default App
