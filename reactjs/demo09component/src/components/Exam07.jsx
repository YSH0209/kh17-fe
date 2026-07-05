import { useCallback, useState } from "react";
import Jumbotron from "./Jumbotron";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

function Exam07() {
    //서버에서 조회했다고 가정하고 state를 구현
    const [countryList, setCountryList] = useState([
        { 
            countryNo : 1 , 
            countryName : "대한민국", 
            countryRegion : "아시아", 
            countryCapital : "서울", 
            countryPopulation : 55000000 
        },
        { 
            countryNo : 2 , 
            countryName : "일본", 
            countryRegion : "아시아", 
            countryCapital : "도쿄", 
            countryPopulation : 127000000 
        },
        { 
            countryNo : 3 , 
            countryName : "미국", 
            countryRegion : "북아메리카", 
            countryCapital : "워싱턴", 
            countryPopulation : 250000000 
        },
        { 
            countryNo : 4 , 
            countryName : "중국", 
            countryRegion : "아시아", 
            countryCapital : "베이징", 
            countryPopulation : 55000000 
        },
        { 
            countryNo : 5 , 
            countryName : "호주", 
            countryRegion : "오세아니아", 
            countryCapital : "캔버라", 
            countryPopulation : 70000000 
        },
    ]);

    const deleteCountry = useCallback(target=>{
        // setCountryList(
        //     countryList.filter(country=>country.countryNo !== target.countryNo)
        // );

        Swal.fire({
            title:"정말 삭제하시겠습니까?",
            text: "삭제 후에는 복구할 수 없습니다",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소"
        })
        .then(result=>{
            if(result.isConfirmed) {//확인
                setCountryList(
                    countryList.filter(country=>country.countryNo !== target.countryNo)
                );
                toast.success("삭제가 완료되었습니다");
            }
        });
    }, [countryList]);

    return (<>
        <Jumbotron title="객체 배열 state와 화면제어"/>

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
                                <th>관리</th>
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
                                <td>
                                    <FaTrash className="text-danger" onClick={e=>deleteCountry(country)}/>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>);
}

export default Exam07;