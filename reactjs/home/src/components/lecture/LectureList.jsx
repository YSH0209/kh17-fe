import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { ClockLoader } from "react-spinners";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Jumbotron from "../../templates/Jumbotron";

export default function LectureList() {
    
    const [ lectureList, setLectureList ] = useState([]);
    const [ last, setLast ] = useState(false);
    const [ size, setSize ] = useState(10);
    const [ loading, setLoading ] = useState(false);

    useEffect(()=>{
        loadMoreList();
    }, []);


    const loadMoreList = useCallback(() => {
        //이미 로딩중이면 차단
        if (loading === true) return;
        setLoading(true);

        const dataSize = lectureList.length;
        const lastLectureNo = dataSize === 0 ? 0 : lectureList[dataSize - 1].lectureNo;

        axios({
            url: "http://localhost:8080/api/lecture/listForReact",
            method: "get",
            params: {//GET방식일 때
                lastLectureNo: lastLectureNo,
                size: size
            }
        })
            .then(response => {
                setLectureList([...lectureList, ...response.data.list]);//이어쓰기
                setLast(response.data.last);
            })
            .finally(() => setLoading(false));
    }, [lectureList, size]);


    return (<>
        <Jumbotron title="강좌 목록" content="강좌 목록 확인 페이지" />

        <Row className="mt-4">
            <Col xs={6}>
                <Form.Select value={size} onChange={e => setSize(parseInt(e.target.value))}
                    classname="w-auto">
                    <option value="5">5개씩 보기</option>
                    <option value="10">10개씩 보기</option>
                    <option value="15">15개씩 보기</option>
                    <option value="20">20개씩 보기</option>
                </Form.Select>
            </Col>
            <Col xs={6} className="text-end">
                <Button as={Link} to="lecture/add" variant="success">
                    <FaPlus />
                    <span className="ms-2">신규 등록</span>
                </Button>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col>
                <Table responsive striped hover className="text-nowrap">
                    <thead>
                        <tr>
                            <th>강좌번호</th>
                            <th>강좌명</th>
                            <th>강좌카테고리</th>
                            <th>강좌시간</th>
                            <th>강좌가격</th>
                            <th>강좌타입</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lectureList.map(lecture => (
                            <tr key={lecture.lectureNo}>
                                <td>{lecture.lectureNo}</td>
                                <td>{lecture.lectureTitle}</td>
                                <td>{lecture.lectureCategory}</td>
                                <td>{lecture.lectureDuration}</td>
                                <td>{lecture.lecturePrice}</td>
                                <td className="text-end">{lecture.lectureType}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>

        {last === false && (
            <Row className="mt-2">
                <Col>
                    <Button variant="outline-success" size="lg"
                        onClick={loadMoreList} className="w-100">
                        <FaChevronDown />
                        <span className="mx-2">더보기</span>
                        <FaChevronDown />
                    </Button>
                </Col>
            </Row>
        )}

        {loading === true && (
            <div className="position-fixed top-0 start-0
                        w-100 h-100 bg-dark bg-opacity-25
                        d-flex justify-content-center alighn-items-center">
                <div className="d-flex flex-column text-center">
                    <ClockLoader size={75} loading={loading} />
                    <p className="mt-2">불러오는 중</p>
                </div>
            </div>
        )}

    </>)
}