import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, HashRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

/*
  React Router V6의 라우팅 방식 종류 및 특징

  <BrowserRouter>
  'Hash' 없이 돌아감
  - 일반적인 주소 패턴으로 컴포넌트를 연결
  - 컴포넌트 별로 독립적인 주소를 가짐
  - [장점] 사용자가 봤을 때 거부감이 없음
  - [단점] 서버랑 합쳐질 경우, 서버 측 설정이 필요함
      (ex) Spring Boot 에 React를 합치게 되면 React에서만 설정해서는 접속이 안됨
      (ex) AWS Tomcat 서버와 합치게 되면 React에서만 설정해서는 접속이 안됨

  
  <HashRouter>
  주소 뒤에 'Hash' 를 붙힘
  - 아이디 표시인 'Hash(#)'를 이용하여 컴포넌트를 연결
  - 컴포넌트가 달라도 동일한 주소를 가짐
  - [장점] 별도의 설정 없이 페이지 구분이 가능함
  - [단점] 사용자가 봤을 때 거부감이 있음 (피싱인가?)

*/

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </StrictMode>,
)
