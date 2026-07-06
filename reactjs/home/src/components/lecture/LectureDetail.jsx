import { Navigate, useNavigate, useParams } from "react-router-dom";
import Jumbotron from "../../templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Row } from "react-bootstrap";


export default function LectureDetail(){
    const { lectureNo } = useParams();

    if(/^[0-9]+$/.test(lectureNo) === false){
        return <Navigate to="/lecture/list" replace />
    }

    const navigate = useNavigate();

    const [ lecture, setLecture ] = useState(null);
    useEffect(()=> {
        axios({
            url : "http://localhost:8080/api/lecture/detail",
            mothod : "get",
            params : { lectureNo : lectureNo }
        })
        .then(response=>{
            setLecture(response.data);
        });
    }, []);

    const deleteLecture = useCallback(()=>{
        Swal.fire({
            title:"정말 삭제하시겠습니까?",
            text:"삭제한 데이터는 복구하실 수 없습니다",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"삭제",
            cancelButtonText:"취소",
            confirmButtonColor:"#d63031",
            cancelButtonColor:"#b2bec3"
        })
        .then(result=>{
            if(result.isConfirmed){
                axios({
                    url : "http://localhost:8080/api/lecture/delete",
                    method : "get",
                    params : { lectureNo : lectureNo }
                })
                .then(response=>{
                    toast.error("강좌 삭제가 완료되었습니다");
                    navigate("/lecture/list");
                });
            }
        })
    }, [lectureNo]);

    return (<>
    <Jumbotron title="강좌 상세"/>
    
        {lecture === null ? (
            <h1>로딩중 입니다...</h1>
        ) : (<>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    강좌명
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    강좌 카테고리
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    강좌 시간
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    강좌 가격
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    강좌 타입
                </Col>
            </Row>
           
        </>)}

    </>)
}