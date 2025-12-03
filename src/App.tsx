import { UserCard } from "./components/common/UserCard"
import { Navbar } from "./components/layout/NavBar"

function App() {

  
  

  return (
    <div>

     <Navbar></Navbar>
     <div className ="flex justify-center items-center pt-10">
      <UserCard ></UserCard></div>
     

    </div>
  )
}

export default App
