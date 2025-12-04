import { UserCard } from "./components/common/UserCard"
import { Navbar } from "./components/layout/NavBar"
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import ProjectPage from "@/pages/ProjectPage";
import CvPage from "@/pages/CvPage";
import ContactPage from "@/pages/ContactPage";

function App() {

  
  

  return (
    <div>

     <Navbar></Navbar>
     <div className ="flex justify-center items-center pt-10">
      <UserCard ></UserCard></div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
     
    </div>
  )
}

export default App
