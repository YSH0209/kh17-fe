import Jumbotron from "@templates/Jumbotron";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/*
    계획

    이 페이지는 전체 상품 목록이 아니라 구매하려는 상품의 목록을 보여주는 페이지
    기존에 만든 상품 페이지에서 구매를 누르면 이쪽을 해당 상품을 전달해야함

    [1] 서버에 임시 결제 예정 정보를 저장하고 해당 번호만 전달하여 불러오는 방법
    (ex)    1번상품 3개, 2번상품 5개 = 주문번호 7번
    (장점)   번호 하나로 무수히 많은 결제정보를 저장하고 불러올 수 있다
            결제가 진행중인 경우를 기억해서 나중에 알려줄 수 있다
    (단점)   DB 테이블이 필요하다
            추가 관리 로직이 필요하다

    [2] 파라미터로 상품번호와 구매수량을 전달하는 방식
    (ex)    1번상품 3개, 2번상품 5개 = ?sale=1:3&sale=2:5
    (장점)   DB가 필요없고 외부에 공유할 수 있다
    (단점)   주소가 길어지고 파라미터 관리 코드가 필요
*/

export default function KakaopayBuyVersion2() {
    //useParams()는 경로변수를 읽는 명령 (라우터에 설정이 되어 있어야함)
    //useSearchParams()는 쿼리 파라미터를 읽는 명령
    const [searchParams, setSearchParams] = useSearchParams();

    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        //쿼리 파라미터를 읽어서 해석한 뒤 orders에 채움
        //?sale=1:5&sale=3:2&sale=5:1&...
        const params = searchParams.getAll("sale")
                        .map(str=>{
                            //:을 기준으로 분해해서 앞이 saleNo, 뒤가 quantity 인 형태의 객체로 변환
                            const [saleNo, quantity] = str.split(":");
                            return {
                                saleNo : parseInt(saleNo),
                                quantity : parseInt(quantity)
                            };
                        })
                        .filter(sale=>{
                            if(Number.isInteger(sale.saleNo) === false) return false;
                            if(Number.isInteger(sale.quantity) === false) return false;1
                            if(sale.saleNo <= 0) return false;
                            if(sale.quantity <= 0) return false;
                            
                            return true;
                        });
        console.log("params", params);
        

    }, []);

    return (<>
        <Jumbotron title="상품 결제 확인" content="구매하실 상품의 정보를 확인하세요"/>


    </>)
}