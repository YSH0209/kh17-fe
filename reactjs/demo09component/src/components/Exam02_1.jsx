import { useState } from "react";
import Jumbotron from "./Jumbotron";
import { useCallback } from "react";
import { useMemo } from "react";


function Exam02_1() {
    const [student, setStudent] = useState({
        studentName: "",
        korean: 0,
        english: 0,
        math: 0,
    });

    //callback - 문자열 입력 (changeStringValue), 정수 입력 (changeNumericvalue)
    const changeStringValue = useCallback(e=>{
        const {name, value} = e.target;
        setStudent({
            ...student,
            [name] : value
        });
    }, [student]);
    const changeNumericValue = useCallback(e=>{
         const {name, value} = e.target;
         const regex = /[^0-9]+/g;
         const replacement = value.replace(regex, "");
        setStudent({
            ...student,
            [name] : parseInt(replacement || 0)
        });
    }, [student]);

    //memo
    const total = useMemo(() => {
        return parseInt(student.korean) + parseInt(student.english) + parseInt(student.math);
    }, [student])

    const avg = useMemo(() => {
        return total / 3;
    }, [total])


    return (
        <>
            <Jumbotron title="학생 성적 계산기2" content="시험 결과를 입력하시면 평균과 총점을 계산해드립니다" />

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">이름</label>
                <div className="col-sm-9">
                    <input type="text" name="studentName" className="form-control"
                        value={student.studentName}
                        onChange={changeStringValue}
                    >
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">국어점수</label>
                <div className="col-sm-9">
                    <input type="text" inputMode="numeric" name="korean" className="form-control"
                        value={student.korean}
                        onChange={changeNumericValue}
                    >
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">영어점수</label>
                <div className="col-sm-9">
                    <input type="text" inputMode="numeric" name="english" className="form-control"
                        value={student.english}
                        onChange={changeNumericValue}
                    >
                    </input>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">수학점수</label>
                <div className="col-sm-9">
                    <input type="text" inputMode="numeric" name="math" className="form-control"
                        value={student.math}
                        onChange={changeNumericValue}
                    >
                    </input>
                </div>
            </div>

            {/* 결과 화면 */}

            <div className="row mt-4">
                <label className="col">
                    <div className="shadow p-4 rounded borderd">
                        <p>{student.studentName}님의 성적은 다음과 같습니다</p> <br/>
                        <p> 총점 : {total} , 평균 : {avg.toFixed(2)}</p>
                    </div>
                </label>
            </div>

        </>
    );
}


export default Exam02_1;