import './App.css'
import Jumbotron from "./components/Jumbotron" //jsx생략

function App() {

  return (
   <div className="container my-5">
    <Jumbotron title="객체 state 다루기" content="입력창 여러개를 하나의 state로 관리하는 법을 배웁니다"/>
    
   </div>
  )
}

export default App
