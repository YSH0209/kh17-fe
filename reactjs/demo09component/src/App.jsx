import './App.css'
import Jumbotron from "./components/Jumbotron" //jsx생략
import Exam01 from "./components/Exam01"
import Exam02 from "./components/Exam02"
import Exam02_1 from "./components/Exam02_1"
import Exam03 from './components/Exam03'
import Exam03_1 from './components/Exam03_1'
import Exam04 from './components/Exam04'
import Exam05 from './components/Exam05'


function App() {


  return (
   <div className="container my-5">
    <Exam01/>

    <hr/>
   
    <Exam02/>

    <hr/>

    <Exam02_1/>

    <hr/>

    <Exam03/>

    <hr/>

    <Exam03_1/>

    <hr/>

    <Exam04/>

    <hr/>

    <Exam05/>

   </div>
  )
}

export default App
