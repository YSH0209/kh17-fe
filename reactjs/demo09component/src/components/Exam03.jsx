import { useCallback, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";

function Exam03() {
    //state - 역동적인 화면을 만들기 위한 핵심데이터
    const [country, setCountry] = useState({
        countryRegion: "",
        countryName : "",
        countryCapital : "",
        countryPopulation : 0
    });

    //memo - state를 이용해서 추가적으로 계산해내는 데이터 (연관항목을 적어 실행 최소화)
    const countryRegionValid = useMemo(()=>{
        const regex = /^(아시아|아프리카|[남북]아메리카|유럽|오세아니아)$/;
        return regex.test(country.countryRegion);
    }, [country.countryRegion]);
    const countryNameValid = useMemo(()=>{
        const regex = /^[가-힣]{1,10}$/;
        return regex.test(country.countryName);
    }, [country.countryName]);
    const countryCapitalValid = useMemo(()=>{
        return country.countryCapital.length > 0;
    }, [country.countryCapital]);
    const countryPopulationValid = useMemo(()=>{
        return country.countryPopulation > 0;
    }, [country.countryPopulation]);

    const valid = useMemo(()=>{
        return countryRegionValid && countryNameValid && countryCapitalValid && countryPopulationValid;
    }, [
        countryRegionValid, 
        countryNameValid, 
        countryCapitalValid, 
        countryPopulationValid
    ]);

    //유효성 검사 결과를 저장
    const countryRegionClass = useMemo(()=>{
        if(country.countryRegion.length === 0) return "";
        return countryRegionValid ? "is-valid" : "is-invalid";
    }, [countryRegionValid, country.countryRegion]);
    const countryNameClass = useMemo(()=>{
        if(country.countryName.length === 0) return "";
        return countryNameValid ? "is-valid" : "is-invalid";
    }, [countryNameValid, country.countryName]);
    const countryCapitalClass = useMemo(()=>{
        if(country.countryCapital.length === 0) return "";
        return countryCapitalValid ? "is-valid" : "is-invalid";
    }, [countryCapitalValid, country.countryCapital]);
    const countryPopulationClass = useMemo(()=>{
        return countryPopulationValid ? "is-valid" : "is-invalid";
    }, [countryPopulationValid]);

    
    //callback - 호출 가능한 함수 (연관항목을 적어 갱신 최소화)
    const changeStringValue = useCallback((e)=>{
        const { name , value } = e.target;

        setCountry({
            ...country,//나머지는 그대로 유지하세요
            [name] : value
        });
    }, [country]);
    const changeNumericValue = useCallback((e)=>{
        const { name , value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");//숫자가 아닌 요소를 제거
        const result = parseInt(replacement);//숫자로 변환
        
        setCountry({
            ...country,//나머지 유지
            [name] : result
        });
    }, [country]);

    //view
    return (<>
        <Jumbotron title="국가 등록 화면" content="국가 정보 등록을 React에서 실습합니다"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">대륙명</label>
            <div className="col-sm-9">
                <select name="countryRegion" value={country.countryRegion}
                        onChange={changeStringValue} className={`form-select ${countryRegionClass}`}>
                    <option value="">선택하세요</option>
                    <option>아시아</option>
                    <option>아프리카</option>
                    <option>북아메리카</option>
                    <option>남아메리카</option>
                    <option>유럽</option>
                    <option>오세아니아</option>
                </select>
                {/* <div className="valid-feedback"></div> */}
                <div className="invalid-feedback">필수 선택 항목입니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">국가명</label>
            <div className="col-sm-9">
                <input type="text" name="countryName" value={country.countryName}
                        onChange={changeStringValue} className={`form-control ${countryNameClass}`}/>
                <div className="valid-feedback">국가명이 설정되었습니다</div>
                <div className="invalid-feedback">국가명은 한글로만 작성 가능합니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수도명</label>
            <div className="col-sm-9">
                <input type="text" name="countryCapital" value={country.countryCapital}
                        onChange={changeStringValue} className={`form-control ${countryCapitalClass}`}/>
                <div className="valid-feedback">수도명이 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">인구</label>
            <div className="col-sm-9">
                <input type="text" name="countryPopulation" value={country.countryPopulation}
                        onChange={changeNumericValue} className={`form-control ${countryPopulationClass}`}/>
                <div className="valid-feedback">인구가 설정되었습니다</div>
                <div className="invalid-feedback">인구는 0보다 커야 합니다</div>
            </div>
        </div>

        <div className="row mt-5">
            <div className="col">
                <button type="button" className="btn btn-success w-100" 
                        disabled={valid === false}>
                    등록하기
                </button>
            </div>
        </div>
    </>)
}

export default Exam03;