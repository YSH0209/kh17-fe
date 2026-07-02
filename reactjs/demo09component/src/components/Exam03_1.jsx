import { useCallback, useEffect, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";

function Exam03_1() {
    //state - 역동적인 화면을 만들기 위한 핵심데이터
    const [country, setCountry] = useState({ //입력데이터를 관리하는 state
        countryRegion: "",
        countryName : "",
        countryCapital : "",
        countryPopulation : 0
    });

    const [result, setResult] = useState({ //판정결과를 관리하는 state
        countryRegion: "",
        countryName : "",
        countryCapital : "",
        countryPopulation : ""
    });
    
    //callback은 내가 원할때, memo는 자동으로 불러짐
    //memo - state를 이용해서 추가적으로 계산해내는 데이터 (연관항목을 적어 실행 최소화)
    const valid = useMemo(()=>{
        if(result.countryRegion !== "is-valid")return false;
        if(result.countryName !== "is-valid")return false;
        if(result.countryCapital !== "is-valid")return false;
        if(result.countryPopulation !== "is-valid")return false;

        return true;
    }, [result]);


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

    //검사하여 결과를 갱신하는 함수들
    const checkCountryRegion = useCallback(()=>{
         const regex = /^(아시아|아프리카|[남북]아메리카|유럽|오세아니아)$/;
         const valid = regex.test(country.countryRegion);
         setResult({
            ...result,
            countryRegion : valid ? "is-valid" : "is-invalid"
         });
    },[country.countryRegion, result]);


    const checkCountryName = useCallback(()=>{
        const regex = /^[가-힣]{1,10}$/;
        const valid = regex.test(country.countryName);
        setResult( {
            ...result,
            countryName : valid ? "is-valid" : "is-invalid"
        });
    }, [country.countryName, result]);

    const checkCountryCapital = useCallback(()=>{
        const valid = country.countryCapital.length > 0;
        setResult({
            ...result,
            countryCapital : valid ? "is-valid" : "is-invalid"
        });
    },[country.countryCapital, result]);

    const checkCountryPopulation = useCallback(()=>{
        const valid = country.countryPopulation > 0;
        setResult({
            ...result,
            countryPopulation : valid ? "is-valid" : "is-invalid"
        });
    },[country.countryPopulation, result]);

    //effect - 특정항목이 변경될 때 마다 자동 실행되는 코드블럭 (낭비의 끝판왕)
    //사용법 : useEffect(함수, [연관항목]);

    //country에서 countryRegion이 변경되자마자 checkCountryRegion 함수를 실행하세요!
    useEffect (()=>{
        //처음에는 검사하지 마세요
        if(result.countryRegion === "") return;

        //검사함수를 실행하세요
        checkCountryRegion();
    }, [country.countryRegion, result.countryRegion]);



    //view
    return (<>
        <Jumbotron title="국가 등록 화면2" content="국가 정보 등록을 React에서 실습합니다"/>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">대륙명</label>
            <div className="col-sm-9">
                <select name="countryRegion" value={country.countryRegion}
                        onChange={changeStringValue} 
                        // onChange={e=>changeStringValue(e)} 
                        // onInput={checkCountryRegion}
                        onClick={checkCountryRegion}
                        className={`form-select ${result.countryRegion}`}>
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
                        onChange={changeStringValue} 
                        onBlur={checkCountryName}
                        className={`form-control ${result.countryName}`}/>
                <div className="valid-feedback">국가명이 설정되었습니다</div>
                <div className="invalid-feedback">국가명은 한글로만 작성 가능합니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">수도명</label>
            <div className="col-sm-9">
                <input type="text" name="countryCapital" value={country.countryCapital}
                        onChange={changeStringValue} 
                        onBlur={checkCountryCapital}
                        className={`form-control ${result.countryCapital}`}/>
                <div className="valid-feedback">수도명이 설정되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </div>
        </div>

        <div className="row mt-4">
            <label className="col-sm-3 col-form-label">인구</label>
            <div className="col-sm-9">
                <input type="text" name="countryPopulation" value={country.countryPopulation}
                        onChange={changeNumericValue} 
                        onBlur={checkCountryPopulation}
                        className={`form-control ${result.countryPopulaion}`}/>
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

export default Exam03_1;