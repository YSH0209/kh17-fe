import Jumbotron from "../../templates/Jumbotron";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LectureAdd() {
    const navigate = useNavigate();
    //state
    const [lecture, setLecture] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "",//숫자이지만 미입력상태로 설정
        lecturePrice: "",//숫자이지만 미입력상태로 설정
        lectureType: ""
    });
    const [result, setResult] = useState({
        lectureTitle: "",
        lectureCategory: "",
        lectureDuration: "",
        lecturePrice: "",
        lectureType: ""
    });

    //callback
    //- 입력함수들
    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;
        setLecture({ ...lecture, [name]: value });
    }, [lecture]);
    const changeNumericValue = useCallback(e => {
        const { name, value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");
        if (replacement.length === 0) {
            setLecture({ ...lecture, [name]: replacement })
        }
        else {
            setLecture({ ...lecture, [name]: parseInt(replacement) });
        }
    }, [lecture]);

    //- 검사함수들
    const checkLectureTitle = useCallback(() => {
        const valid = lecture.lectureTitle.length > 0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({ ...result, lectureTitle: clazz });
    }, [lecture, result]);
    const checkLectureCategory = useCallback(() => {
        //const regex = /^(이론|실습|시험)$/;
        //const valid = regex.test(lecture.lectureCategory);
        const valid = ['이론', '실습', '시험'].includes(lecture.lectureCategory);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({ ...result, lectureCategory: clazz });
    }, [lecture, result]);
    const checkLectureDuration = useCallback(() => {
        const valid = lecture.lectureDuration !== ""
            && lecture.lectureDuration % 30 === 0
            && lecture.lectureDuration > 0
            && lecture.lectureDuration <= 300;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({ ...result, lectureDuration: clazz });
    }, [lecture, result]);
    const checkLecturePrice = useCallback(() => {
        const valid = lecture.lecturePrice !== ""
            && lecture.lecturePrice >= 0;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({ ...result, lecturePrice: clazz });
    }, [lecture, result]);
    const checkLectureType = useCallback(() => {
        //const regex = /^(오프라인|온라인|혼합)$/;
        //const valid = regex.test(lecture.lectureType);
        const valid = ['오프라인', '온라인', '혼합'].includes(lecture.lectureType);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult({ ...result, lectureType: clazz });
    }, [lecture, result]);

    //- 데이터 전송(등록)
    const send = useCallback(() => {
        axios({
            url: "http://localhost:8080/api/lecture/insert",
            method: "post",
            data: lecture
        })
            .then(response => { // -> [ data ] <- [ lectureDto ] 이렇게 DB에서 받아온 정보가 들어있음
                //sweetalert2 생성 코드
                Swal.fire({
                    title: "강좌 생성 완료",
                    icon: "success",
                    confirmButtonText: "확인"
                })
                .then(result=>{
                    //목록 또는 상세로 이동
                    navigate(`/lecture/datail/${response.data.lectureNo}`);
                });

            });
    }, [lecture]);

    //memo
    const allValid = useMemo(() => {
        if (result.lectureTitle !== "is-valid") return false;
        if (result.lectureCategory !== "is-valid") return false;
        if (result.lectureDuration !== "is-valid") return false;
        if (result.lecturePrice !== "is-valid") return false;
        if (result.lectureType !== "is-valid") return false;

        return true;
    }, [result]);

    //effect
    useEffect(() => {
        if (lecture.lectureCategory === "" && result.lectureCategory === "")
            return;
        checkLectureCategory();
    }, [lecture.lectureCategory, result.lectureCategory]);
    useEffect(() => {
        if (lecture.lectureType === "" && result.lectureType === "") return;
        checkLectureType();
    }, [lecture.lectureType, result.lectureType]);

    return (<>
        <Jumbotron title="신규 강좌 등록" />

         <div className="row mt-4">
                <label className="col-sm-3 col-form-label">강좌명</label>
                <div className="col-sm-9">
                    <input type="text" name="lectureTitle" value={lecture.lectureTitle}
                        onChange={changeStringValue} className={`form-control ${result.lectureTitle}`}
                        onBlur={checkLectureTitle}
                        placeholder="e.g.,정보처리 산업기사 필기" />
                    <div className="valid-feedback">과정 이름이 설정되었습니다</div>
                    <div className="invalid-feedback">필수 입력 항목입니다</div>
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">카테고리</label>
                <div className="col-sm-9">
                    <select name="lectureCategory" className={`form-select ${result.lectureCategory}`}
                        value={lecture.lectureCategory} onChange={changeStringValue}>
                        <option value="">선택하세요</option>
                        <option>이론</option>
                        <option>실습</option>
                        <option>시험</option>
                    </select>
                    <div className="invalid-feedback">필수 선택 항목입니다</div>
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">수업시간(H)</label>
                <div className="col-sm-9">
                    <input type="text" name="lectureDuration" value={lecture.lectureDuration}
                        onChange={changeNumericValue}
                        onBlur={checkLectureDuration}
                        className={`form-control ${result.lectureDuration}`}
                        placeholder="30시간 단위로만 설정 가능" />
                    <div className="valid-feedback">강의시간이 올바르게 설정되었습니다</div>
                    <div className="invalid-feedback">강의시간은 30시간 단위로만 설정 가능합니다</div>
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">수강료(KRW)</label>
                <div className="col-sm-9">
                    <input type="text" name="lecturePrice" value={lecture.lecturePrice}
                        onChange={changeNumericValue}
                        onBlur={checkLecturePrice}
                        className={`form-control ${result.lecturePrice}`}
                        placeholder="0 이상으로만 설정 가능" />
                    <div className="valid-feedback">수강료가 올바르게 설정되었습니다</div>
                    <div className="invalid-feedback">수강료는 0 이상으로만 설정 가능합니다</div>
                </div>
            </div>
            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">수업방식</label>
                <div className="col-sm-9">
                    <select name="lectureType"
                        className={`form-select ${result.lectureType}`}
                        value={lecture.lectureType} onChange={changeStringValue}>
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
                        disabled={!allValid} onClick={send}>
                        + 신규 등록하기
                    </button>
                </div>
            </div>

    </>)
}