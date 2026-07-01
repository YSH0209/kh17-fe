import { useState } from 'react'
import './App.css'

function App() {
  //이 화면은 이미지의 "크기"를 조절하는 것이 목표
  //"크기" 가 변할 수 있으므로, state로 관리해서 화면과 연결시켜두고 변경하도록 처리
const [size, setSize] = useState(500);
  return (
    <>

    <button onClick={()=>setSize(size+10)}>크게</button>
    <button onClick={()=>setSize(size-10)}>작게</button>
    <h2>현재 크기 : {size}px</h2>
    <hr/>
    <img src="https://picsum.photos/500" 
          className="target"
          width={size} height={size}></img>
    </>
  )
}

export default App
