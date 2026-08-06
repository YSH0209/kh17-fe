import Jumbotron from "@templates/Jumbotron";
import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";

export default function KakaopayBuyFailVersion2() {
    //path variable
    const { purchaseNo } = useParams();

    const loadData = useCallback(async ()=>{
        const { data } = await apiClient.get(`/purchase/heavy/${purchaseNo}`)
        console.log(data)
    },[]);




    return (<>
        <Jumbotron title="상품 결제 실패" content="상품 결제에 실패하였습니다. 다시 시도해주세요."/>

        
    </>)
}