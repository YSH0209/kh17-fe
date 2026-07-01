import './App.css'
import { useMemo } from 'react';
import { useState } from 'react';

function App() {
  const [q1, setQ1] = useState(""); //첫번째 입력 항목
  const [q2, setQ2] = useState(""); //첫번째 입력 항목
  const [q3, setQ3] = useState(""); //첫번째 입력 항목
  const [q4, setQ4] = useState(""); //첫번째 입력 항목
  const [q5, setQ5] = useState(""); //첫번째 입력 항목
 
  const count1 = useMemo(()=>{
    return q1.length;
  }, [q1]);
  const valid1 = useMemo(()=>{
    return count1 <= 1000;
  }, [count1]);
  const class1 = useMemo(()=>{
    return valid1 ? "" : "text-danger";
  }, [valid1]);

  const count2 = useMemo(()=>{
    return q2.length;
  }, [q2]);
  const valid2 = useMemo(()=>{
    return count2 <= 1000;
  }, [count2]);
  const class2 = useMemo(()=>{
    return valid2 ? "" : "text-danger";
  }, [valid2]);

  const count3 = useMemo(()=>{
    return q3.length;
  }, [q3]);
  const valid3 = useMemo(()=>{
    return count3 <= 1000;
  }, [count3]);
  const class3 = useMemo(()=>{
    return valid3 ? "" : "text-danger";
  }, [valid3]);

  const count4 = useMemo(()=>{
    return q4.length;
  }, [q4]);
  const valid4 = useMemo(()=>{
    return count4 <= 1000;
  }, [count4]);
  const class4 = useMemo(()=>{
    return valid4 ? "" : "text-danger";
  }, [valid4]);

  const count5 = useMemo(()=>{
    return q5.length;
  }, [q5]);
  const valid5 = useMemo(()=>{
    return count5 <= 1000;
  }, [count5]);
  const class5 = useMemo(()=>{
    return valid5 ? "" : "text-danger";
  }, [valid5]);


  // 제출 검사
  const allValid = useMemo(()=>{
    return q1.length > 0 && valid1 
        && q2.length > 0 && valid2
        && q3.length > 0 && valid3
        && q4.length > 0 && valid4
        && q5.length > 0 && valid5;
  },[ q1, q2, q3, q4, q5, valid1, valid2, valid3, valid4, valid5])



  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <div className="p-4 bg-dark text-light rounded">
          <h1>자기소개서</h1>
          </div>
        </div>
      </div>

      {/* 질문 */}

    <div className="row mt-4">
        <div className="col">
            <h3>(Q) 당신의 성장과정에 대해서 소개해주세요</h3>
        </div>
        <textarea 
        className="form-control mt-2" value={q1}
        rows="10" onChange={e=>setQ1(e.target.value)}/>
        <div className={`text-end ${class1}`}>
        {count1}/1000글자
        </div>
    </div>
    
    <div className="row mt-4">
        <div className="col">
            <h3>(Q) 당신의 성격에 대한 장단점을 적어주세요</h3>
        </div>
        <textarea 
        className="form-control mt-2" value={q2}
        rows="10" onChange={e=>setQ2(e.target.value)}/>
        <div className={`text-end ${class2}`}>
        {count2}/1000글자
        </div>
    </div>

    <div className="row mt-4">
        <div className="col">
            <h3>(Q) 역경을 이겨낸 경험이 있다면 적어주세요</h3>
        </div>
        <textarea 
        className="form-control mt-2" value={q3}
        rows="10" onChange={e=>setQ3(e.target.value)}/>
        <div className={`text-end ${class3}`}>
        {count3}/1000글자
        </div>
    </div>

    <div className="row mt-4">
        <div className="col">
            <h3>(Q) 우리 회사에 지원한 동기가 무엇입니까?</h3>
        </div>
        <textarea 
        className="form-control mt-2" value={q4}
        rows="10" onChange={e=>setQ4(e.target.value)}/>
        <div className={`text-end ${class4}`}>
        {count4}/1000글자
        </div>
    </div>

    <div className="row mt-4">
        <div className="col">
            <h3>(Q) 우리 회사 입사 후 10년뒤의 모습을 상상해서 적어주세요</h3>
        </div>
        <textarea 
        className="form-control mt-2" value={q5}
        rows="10" onChange={e=>setQ5(e.target.value)}/>
        <div className={`text-end ${class5}`}>
        {count5}/1000글자
        </div>
    </div>

    {/* 제출버튼 */}
    <div className="row mt-5">
      <div className="col">
        <button className="btn btn-lg btn-success w-100" 
          disabled={allValid == false}>
          제출하기
        </button>
      </div>
    </div>


    </div>


  )
}

export default App
