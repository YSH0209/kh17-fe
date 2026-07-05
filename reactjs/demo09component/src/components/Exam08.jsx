import { useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";


function Exam08() {
    //state
    const [lectureList, setLectureList] = useState([]);//초기값이 중요
    //effect
    useEffect(() => {
        axios({
            url: "http://localhost:8080/api/lecture/list",
            method: "get"
        })
            .then(response => {
                setLectureList(response.data);
                console.log("데이터 로드 완료");
            });
    }, []);

    return (<>
        <Jumbotron title="강좌 목록" />

        <div className="row mt-4">
            {lectureList.map(lecture=>(
            <div className="col-md-6 col-lg-4" key={lecture.lectureNo}>
                <div className="card mb-3">
                    <h3 className="card-header text-truncate">{lecture.lectureCategory}</h3>
                    <div className="card-body">
                        <h5 className="card-title">{lecture.lectureTitle}</h5>
                        <h6 className="card-subtitle text-muted">{lecture.lectureType}</h6>
                    </div>
                    <div className="card-body">
                        <p className="card-text">강좌에 대한 설명들...</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{lecture.lecturePrice.toLocaleString()}원</li>
                        <li className="list-group-item">{lecture.lectureDuration.toLocaleString()}시간</li>
                        <li className="list-group-item">1시간 당 {(lecture.lecturePrice / lecture.lectureDuration).toLocaleString()}원</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">상세 정보 보기</a>
                    </div>
                </div>
            </div>
            ))}
        </div>
    </>)
}

export default Exam08;