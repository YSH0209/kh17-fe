import { useState } from 'react'
import './App.css'

function App() {
  const [ money , setMoney] = useState(0);
  
  return (
    <>

    <h1>이체 금액 입력</h1>
    <hr/>
    {/* <div>{money}</div> */}
    <input value={money} readOnly></input>
    <hr/>
    <button onClick={()=>setMoney(money+10000000)}>천만</button>
    <button onClick={()=>setMoney(money+1000000)}>백만</button>
    <button onClick={()=>setMoney(money+100000)}>십만</button>
    <button onClick={()=>setMoney(money+10000)}>만</button>
    <button onClick={()=>setMoney(money+1000)}>천</button>
    <button onClick={()=>setMoney(money+100)}>백</button>
    <button onClick={()=>setMoney(money+10)}>십</button>
    <button onClick={()=>setMoney(money+1)}>일</button>
    <button onClick={()=>setMoney(parseInt(money/10))}>지우기</button>
    <button onClick={()=>setMoney(0)}>전체지우기</button>

    </>
  )
}

export default App
