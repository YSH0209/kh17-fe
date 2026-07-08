import Jumbotron from "../../templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaPlus } from "react-icons/fa6";
import { ClockLoader } from "react-spinners";
import { Row, Col, Form, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function CountryList() {
    //state
    const [countryList, setCountryList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);

    //effect
    useEffect(() => {
        loadMoreList();
    }, []);

    //callback
    const loadMoreList = useCallback(async () => {
        //이미 로딩중이면 차단
        if (loading === true) return;
        setLoading(true);

        const dataSize = countryList.length;
        const lastCountryNo = dataSize === 0 ? 0 : countryList[dataSize - 1].countryNo;

        const response = await axios.post(
            //"http://localhost:8080/api/country/list-more",
            `/api/country/list-more`,
            { lastNo : lastCountryNo , 
                size : size }
        );
        setCountryList([...countryList, ...response.data.list]);//이어쓰기
        setLast(response.data.last);

        setLoading(false);
    }, [countryList, size]);

    return (<>
        <Jumbotron title="국가 목록" content="등록된 국가들의 목록을 확인하세요" />

        <Row className="mt-4">
            <Col xs={6}>
                <Form.Select value={size} onChange={e => setSize(parseInt(e.target.value))}
                    className="w-auto">
                    <option value="5">5개씩 보기</option>
                    <option value="10">10개씩 보기</option>
                    <option value="20">20개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                </Form.Select>
            </Col>
            <Col xs={6} className="text-end">
                <Button as={Link} to="/country/add" variant="success">
                    <FaPlus />
                    <span className="ms-2">신규등록</span>
                </Button>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col>
                <Table responsive striped hover className="text-nowrap">
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>국가</th>
                            <th>대륙</th>
                            <th>수도</th>
                            <th className="text-end">인구</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countryList.map(country => (
                            <tr key={country.countryNo}>
                                <td>{country.countryNo}</td>
                                <td>
                                    <Link to={`/country/detail/${country.countryNo}`}>
                                        {country.countryName}
                                    </Link>
                                </td>
                                <td>{country.countryRegion}</td>
                                <td>{country.countryCapital}</td>
                                <td className="text-end">{country.countryPopulation.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>

        {/* 더보기 버튼 */}
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

        {/* 로딩화면 */}
        {loading === true && (
            <div className="position-fixed top-0 start-0 
                        w-100 h-100 bg-dark bg-opacity-25
                        d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column text-center">
                    <ClockLoader size={75} loading={loading} />
                    <p className="mt-2">불러오는중</p>
                </div>
            </div>
        )}
    </>)
}