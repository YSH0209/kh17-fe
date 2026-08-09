import { Row, Col, Form, Button } from "react-bootstrap";
import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import { apiClient } from "@utils/reaxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CountryAdd() {
    //state - 역동적인 화면을 만들기 위한 핵심데이터
    const [country, setCountry] = useState({//입력데이터를 관리하는 state
        countryRegion: "",
        countryName: "",
        countryCapital: "",
        countryPopulation: 0
    });

    const [result, setResult] = useState({//판정결과를 관리하는 state
        countryRegion: "",
        countryName: "",
        countryCapital: "",
        countryPopulation: ""
    });

    //memo - state를 이용해서 추가적으로 계산해내는 데이터 (연관항목을 적어 실행 최소화)
    const valid = useMemo(() => {
        if (result.countryRegion !== "is-valid") return false;
        if (result.countryName !== "is-valid") return false;
        if (result.countryCapital !== "is-valid") return false;
        if (result.countryPopulation !== "is-valid") return false;
        return true;
    }, [result]);

    //페이지 이동 도구(location 대신 사용)
    const navigate = useNavigate();

    //callback - 호출 가능한 함수 (연관항목을 적어 갱신 최소화)
    const changeStringValue = useCallback((e) => {
        const { name, value } = e.target;

        setCountry({
            ...country,//나머지는 그대로 유지하세요
            [name]: value
        });
    }, [country]);
    const changeNumericValue = useCallback((e) => {
        const { name, value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");//숫자가 아닌 요소를 제거
        const result = parseInt(replacement);//숫자로 변환

        setCountry({
            ...country,//나머지 유지
            [name]: result
        });
    }, [country]);

    //검사하여 결과를 갱신하는 함수들
    const checkCountryRegion = useCallback(() => {
        const regex = /^(아시아|아프리카|[남북]아메리카|유럽|오세아니아)$/;
        const valid = regex.test(country.countryRegion);
        setResult({
            ...result,
            countryRegion: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryRegion, result])
    const checkCountryName = useCallback(() => {
        const regex = /^[가-힣]{1,10}$/;
        const valid = regex.test(country.countryName);
        setResult({
            ...result,
            countryName: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryName, result]);
    const checkCountryCapital = useCallback(() => {
        const valid = country.countryCapital.length > 0;
        setResult({
            ...result,
            countryCapital: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryCapital, result]);
    const checkCountryPopulation = useCallback(() => {
        const valid = country.countryPopulation > 0;
        setResult({
            ...result,
            countryPopulation: valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryPopulation, result]);

    //effect - 특정항목이 변경될 때마다 자동 실행되는 코드블럭 (낭비의 끝판왕)
    //사용법 : useEffect(함수, [연관항목]);

    //country에서 countryRegion이 변경되자마자 checkCountryRegion 함수 실행하세요!
    useEffect(() => {
        //처음에는 검사하지 마세요
        if (country.countryRegion === "" && result.countryRegion === "") return;

        //검사함수를 실행하세요
        checkCountryRegion();
    }, [country.countryRegion, result.countryRegion]);

    //데이터 전송 함수
    // callback은 연관항목이 재설정 될때만 불러짐(자원을 아낄수 있음)
    const send = useCallback(async () => {
        const response = await apiClient.post("/api/country/", country);
        toast.success("국가 등록이 완료되었습니다");
        navigate("/country/list");
    }, [country]);

    return (<>
        <Jumbotron title="신규 국가 등록" />

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>대륙명</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Select name="countryRegion" value={country.countryRegion}
                    onChange={changeStringValue} className={result.countryRegion}>
                    <option value="">선택하세요</option>
                    <option>아시아</option>
                    <option>아프리카</option>
                    <option>북아메리카</option>
                    <option>남아메리카</option>
                    <option>유럽</option>
                    <option>오세아니아</option>
                </Form.Select>
                {/* <div className="valid-feedback"></div> */}
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>국가명</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="countryName" value={country.countryName}
                    onChange={changeStringValue}
                    onBlur={checkCountryName}
                    className={result.countryName} />
                <div className="valid-feedback">국가명이 설정되었습니다</div>
                <div className="invalid-feedback">국가명은 한글로만 작성 가능합니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>수도명</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="countryCapital"
                    value={country.countryCapital}
                    onChange={changeStringValue}
                    onBlur={checkCountryCapital}
                    className={result.countryCapital} />
                <div className="valid-feedback">수도명이 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>인구</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="countryPopulation" value={country.countryPopulation}
                    onChange={changeNumericValue}
                    onBlur={checkCountryPopulation}
                    className={result.countryPopulation} />
                <div className="valid-feedback">인구가 설정되었습니다</div>
                <div className="invalid-feedback">인구는 0보다 커야 합니다</div>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col>
                <Button type="button" variant="success" className="w-100"
                    disabled={valid === false} onClick={send}>
                    <FaPlus className="me-2" />
                    <span>등록하기</span>
                </Button>
            </Col>
        </Row>
    </>)
}