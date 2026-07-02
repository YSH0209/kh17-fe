import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";


function Exam04() {
    //state
    const [lecture, setLecture] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "", //숫자지만 미입력 상태로 설정
        lecturePrice: "", //숫자지만 미입력 상태로 설정
        lectureType: ""
    });

    const [result, setResult] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "",
        lecturePrice: "",
        lectureType: ""
    });

    //memo
    const valid = useMemo(() => {
        if (result.lectureTitle !== "is-valid") return false;
        if (result.lectureCategory !== "is-valid") return false;
        if (result.lectureDuration !== "is-valid") return false;
        if (result.lecturePrice !== "is-valid") return false;
        if (result.lectureType !== "is-valid") return false;

        return true;
    }, [result])

    //callback
    const changeStringValue = useCallback((e) => {
        const { name, value } = e.target;
        setLecture({
            ...lecture,
            [name]: value
        });
    }, [lecture]);

    const changeNumericValue = useCallback((e) => {
        const { name, value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");
        
        const result = parseInt(replacement);
        setLecture({
            ...lecture,
            [name]: result
        });
    }, [lecture]);
    
    //검사후 결과갱신 함수
    const checkLectureTitle = useCallback(() => {
        const valid = lecture.lectureTitle.length > 0;
        setResult({
            ...result,
            lectureTitle: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureTitle, result]);

    const checkLectureCategory = useCallback(() => {
        const regex = /^(이론|실습|시험)$/;
        const valid = regex.test(lecture.lectureCategory);
        setResult({
            ...result,
            lectureCategory: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureCategory, result]);

    const checkLectureDuration = useCallback(() => {
        // const duration = parseInt(lecture.lectureDuration) > 0;
        // const valid = duration <= 300 && duration % 30 == 0;

        const valid = lecture.lectureDuration !== "" 
                        && lecture.lectureDuration % 30 === 0
                        && lecture.lectureDuration <= 300
                        && lecture.lectureDuration > 0;
        setResult({
            ...result,
            lectureDuration: valid ? "is-valid" : "is-invalid"
        });

    }, [lecture.lectureDuration, result]);

    const checkLecturePrice = useCallback(() => {
        const price = parseInt(lecture.lecturePrice) > 0;
        const valid = price >= 0 && price <= 1000000000;
        setResult({
            ...result,
            lecturePrice: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lecturePrice, result]);

    const checkLectureType = useCallback(() => {
        const regex = /^(온라인|오프라인|혼합)$/;
        const valid = regex.test(lecture.lectureType);
        setResult({
            ...result,
            lectureType: valid ? "is-valid" : "is-invalid"
        });
    }, [lecture.lectureType, result]);

    //effect
    useEffect(()=>{
        if(lecture.lectureCategory === "" && result.lectureCategory === "")
            return;

        checkLectureCategory();
    },[lecture.lectureCategory, result.lectureCategory]);

    useEffect(()=>{
        if(lecture.lectureType === "" && result.lectureType === "")
            return;

        checkLectureType();
    },[lecture.lectureType, result.lectureType]);
    
    //view
    return (
        <>
            <Jumbotron title="강좌 개설" content="신규 강좌 개설에 필요한 정보를 입력해주세요" />

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">강좌명 *</label>
                <div className="col-sm-9">
                    <input type="text" name="lectureTitle" value={lecture.lectureTitle}
                        onChange={changeStringValue}
                        onBlur={checkLectureTitle}
                        className={`form-control ${result.lectureTitle}`}
                    ></input>
                    <div className="valid-feedback">강좌명이 설정되었습니다</div>
                    <div className="invalid-feedback">강좌명은 한글자 이상이어야 합니다</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">카테고리 *</label>
                <div className="col-sm-9">
                    <select name="lectureCategory" value={lecture.lectureCategory}
                        onChange={changeStringValue}
                        // onClick={checkLectureCategory}
                        className={`form-select ${result.lectureCategory}`}>
                        <option value="">선택하세요</option>
                        <option>이론</option>
                        <option>실습</option>
                        <option>시험</option>
                    </select>
                    <div className="invalid-feedback">필수 선택 항목입니다</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">강의시간 *</label>
                <div className="col-sm-9">
                    <input type="text" name="lectureDuration" value={lecture.lectureDuration}
                        onChange={changeNumericValue}
                        onBlur={checkLectureDuration}
                        placeholder="30시간 단위로만 설정 가능"
                        className={`form-control ${result.lectureDuration}`}
                    ></input>
                    <div className="valid-feedback">강의시간이 설정되었습니다</div>
                    <div className="invalid-feedback">30시간 단위로 최대 300시간 이내에서 설정 가능합니다</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">수강료 *</label>
                <div className="col-sm-9">
                    <input type="text" name="lecturePrice" value={lecture.lecturePrice}
                        onChange={changeNumericValue}
                        onBlur={checkLecturePrice}
                        className={`form-control ${result.lecturePrice}`}
                    ></input>
                    <div className="valid-feedback">수강료가 설정되었습니다</div>
                    <div className="invalid-feedback">수강료는 0 이상으로 설정해야 합니다</div>
                </div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">강의유형 *</label>
                <div className="col-sm-9">
                    <select name="lectureType" value={lecture.lectureType}
                        onChange={changeStringValue}
                        // onClick={checkLectureType}
                        className={`form-select ${result.lectureType}`}>
                        <option value="">선택하세요</option>
                        <option>온라인</option>
                        <option>오프라인</option>
                        <option>혼합</option>
                    </select>
                    <div className="invalid-feedback">필수 선택 항목입니다</div>
                </div>
            </div>

            <div className="row mt-5">
            <div className="col text-end">
                <button type="button" className="btn btn-lg btn-success" 
                        disabled={valid === false}>
                    등록하기
                </button>
            </div>
        </div>





        </>
    )

}

export default Exam04;