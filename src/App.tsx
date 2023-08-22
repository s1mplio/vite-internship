
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SecondPage from "./component/SecondPage"
import UserForm from "./component/UserForm"
function App() {
 

  return (
    <Router>
      <Routes>
         <Route element={<UserForm/>} path="/" />
         <Route element={<SecondPage/>} path="/second-page"/>
       </Routes>
    </Router>
  )
}

export default App
