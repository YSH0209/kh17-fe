import './App.css'
import Jumbotron from "./components/Jumbotron" //jsx생략
import Exam01 from "./components/Exam01"
import Exam02 from "./components/Exam02"


function App() {


  return (
   <div className="container my-5">
    <Exam01/>

    <hr/>
   
    <Exam02/>
   </div>
  )
}

export default App
