import { useCallback, useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa6";
import { ClockLoader } from "react-spinners";


function Exam10() {
    //state
    const [countryList, setCountryList] = useState([]);
    const [last, setLast] = useState(false);
    const [size, setSize] = useState(10);
    const [loading, setLoading] = useState(false);
    
    //effect
    useEffect(()=>{
        loadMoreList();
    }, []);
    
    //callback
    const loadMoreList = useCallback(()=>{
        //이미 로딩중이면 차단
        if(loading === true) return;
        setLoading(true);

        const dataSize = countryList.length;
        const lastCountryNo = dataSize === 0 ? 0 : countryList[dataSize-1].countryNo;

        axios({
            url:"http://localhost:8080/api/country/listForReact",
            method:"get",
            params: {//GET방식일 때
                lastCountryNo : lastCountryNo,
                size : size
            }
        })
        .then(response=>{
            //덮어쓰기가 아니라 추가(이어쓰기)가 필요
            //setCountryList(response.data.list);//덮어쓰기
            setCountryList([...countryList, ...response.data.list]);//이어쓰기
            setLast(response.data.last);
        })
        .finally(()=>setLoading(false));
    }, [countryList, size]);

    //view
    return (<>
        <Jumbotron title="더보기 방식의 목록"/>

        <div className="row mt-4">
            <div className="col">
                <select value={size} onChange={e=>setSize(parseInt(e.target.value))}
                        className="form-select w-auto">
                    <option value="5">5개씩 보기</option>
                    <option value="10">10개씩 보기</option>
                    <option value="20">20개씩 보기</option>
                    <option value="50">50개씩 보기</option>
                </select>
            </div>
        </div>

        <div className="row mt-4">
            <div className="col">
                <div className="text-nowrap table-responsive">
                    <table className="table table-hover table-striped">
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
                            {countryList.map(country=>(
                            <tr key={country.countryNo}>
                                <td>{country.countryNo}</td>
                                <td>{country.countryName}</td>
                                <td>{country.countryRegion}</td>
                                <td>{country.countryCapital}</td>
                                <td className="text-end">{country.countryPopulation.toLocaleString()}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* 더보기 버튼 */}
        { last === false && (
        <div className="row mt-2">
            <div className="col">
                <button type="button" className="btn btn-success btn-lg w-100"
                        onClick={loadMoreList}>
                    <FaChevronDown/>
                    <span className="mx-2">더보기</span>
                    <FaChevronDown/>
                </button>
            </div>
        </div>
        ) }

        {/* 로딩화면 */}
        { loading === true && (
        <div className="position-fixed top-0 start-0 
                        w-100 h-100 bg-dark bg-opacity-25
                        d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column text-center">
                <ClockLoader size={75} loading={loading}/>
                <p className="mt-2">불러오는중</p>
            </div>
        </div>
        ) }
    </>)
}

export default Exam10;