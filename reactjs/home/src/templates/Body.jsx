import { Route, Routes } from "react-router-dom";
import Home from "@components/Home";

import NotFound from "@error/NotFound";
import AccountBlock from "@error/AccountBlock";

import CountryList from "@components/country/CountryList";
import CountryAdd from "@components/country/CountryAdd";
import CountryDetail from "@components/country/CountryDetail";
import CountryEdit from "@components/country/CountryEdit";
import CountrySearch from "@components/country/CountrySearch";
import CountryComplexSearch from "@components/country/CountryComplexSearch";

import LectureList from "@components/lecture/LectureList";
import LectureAdd from "@components/lecture/LectureAdd";
import LectureDetail from "@components/lecture/LectureDetail";

import BookList from "@components/book/BookList";
import BookSpa from "@components/book/BookSpa";

import AccountJoin from "@components/account/AccountJoin";
import AccountJoinSuccess from "@components/account/AccountJoinSuccess";
import AccountJoinFail from "@components/account/AccountJoinFail";
import AccountLogin from "@components/account/AccountLogin";
import AccountPassword from "@components/account/AccountPassword";
import AccountChange from "@components/account/AccountChange";
import AccountNeedUpdate from "@components/account/AccountNeedUpdate";

import AccountCart from "@components/account/AccountCart";

import MyPage from "@components/account/MyPage";

import AdminUsers from "@components/admin/AdminUsers";
import AdminUsersScroll from "@components/admin/AdminUsersScroll";
import AdminUserDetail from "@components/admin/AdminUserDetail";

import AdminSaleAdd from "@components/admin/sale/AdminSaleAdd";
import AdminSaleEdit from "@components/admin/sale/AdminSaleEdit";

import SaleList from "@components/sale/SaleList";
import SaleDetail from "@components/sale/SaleDetail";

import TestMain from "@components/session/TestMain";

import Private from "@guard/Private";
import Admin from "@guard/Admin";

import KakaopayBuyVersion1 from "@components/pay/v1/KakaopayBuyVersion1";
import KakaopayBuySuccessVersion1 from "@components/pay/v1/KakaopayBuySuccessVersion1";
import KakaopayBuyCancelVersion1 from "@components/pay/v1/KakaopayBuyCancelVersion1";
import KakaopayBuyFailVersion1 from "@components/pay/v1/KakaopayBuyFailVersion1";

import KakaopayBuyVersion2 from "@components/pay/v2/KakaopayBuyVersion2";
import KakaopayBuySuccessVersion2 from "@components/pay/v2/KakaopayBuySuccessVersion2";
import KakaopayBuyCancelVersion2 from "@components/pay/v2/KakaopayBuyCancelVersion2";
import KakaopayBuyFailVersion2 from "@components/pay/v2/KakaopayBuyFailVersion2";
import KakaopayBuyDetailVersion2 from "@components/pay/v2/KakaopayBuyDetailVersion2";

import WebSocketV1BasicClient from "@components/websocket/WebSocketV1BasicClient";

export default function Body() {

    return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/country/list" element={<CountryList/>}/>
        <Route path="/country/add" element={<CountryAdd/>}/>
        {/* 제일 마지막에 적혀있는 값을 countryNo라는 이름으로 관리하겠다 */}
        <Route path="/country/detail/:countryNo" element={<CountryDetail/>}/>
        <Route path="/country/edit/:countryNo" element={<CountryEdit/>}/>
        <Route path="/country/search" element={<CountrySearch/>}/>
        <Route path="/country/complex" element={<CountryComplexSearch/>}/>
        
        <Route path="/lecture/list" element={<LectureList/>}/>
        <Route path="/lecture/add" element={<LectureAdd/>}/>
        <Route path="/lecture/detail/:lectureNo" element={<LectureDetail/>}/>
        
        <Route path="/book/list" element={<BookList/>}/>
        <Route path="/book/spa" element={<BookSpa/>}/>

        {/* 회원 관련 */}
        <Route path="/account/join" element={<AccountJoin/>}/>
        <Route path="/account/joinSuccess" element={<AccountJoinSuccess/>}/>
        <Route path="/account/joinFail" element={<AccountJoinFail/>}/>
        <Route path="/account/login" element={<AccountLogin/>}/>
        <Route path="/account/mypage" element={<Private><MyPage/></Private>}/>
        <Route path="/account/password" element={<Private><AccountPassword/></Private>}/>
        <Route path="/account/change" element={<Private><AccountChange/></Private>}/>
        <Route path="/account/needUpdate" element={<Private><AccountNeedUpdate/></Private>}/>

        <Route path="/account/cart" element={<Private><AccountCart/></Private>}/>

        {/* 관리자 기능 */}
        <Route path="/admin/users" element={<Admin><AdminUsers/></Admin>}></Route>
        <Route path="/admin/users2" element={<Admin><AdminUsersScroll/></Admin>}></Route>
        <Route path="/admin/detail/:accountId" element={<Admin><AdminUserDetail/></Admin>}></Route>

        <Route path="/admin/saleAdd" element={<Admin><AdminSaleAdd/></Admin>}></Route>
        <Route path="/admin/saleEdit/:saleNo" element={<Admin><AdminSaleEdit/></Admin>}></Route>

        <Route path="/sale/list" element={<SaleList/>}></Route>
        <Route path="/sale/detail/:saleNo" element={<SaleDetail/>}></Route>

        {/* 세션테스트 */}
        <Route path="/session/test" element={<TestMain/>}/>

        {/* 결제 관련 */}
        <Route path="/pay/v1/buy" element={<KakaopayBuyVersion1/>}/>
        <Route path="/pay/v1/buy/success" element={<KakaopayBuySuccessVersion1/>}/>
        <Route path="/pay/v1/buy/cancel" element={<KakaopayBuyCancelVersion1/>}/>
        <Route path="/pay/v1/buy/fail" element={<KakaopayBuyFailVersion1/>}/>

        <Route path="/pay/v2/buy" element={<Private><KakaopayBuyVersion2/></Private>}/>
        <Route path="/pay/v2/buy/success/:purchaseNo" element={<Private><KakaopayBuySuccessVersion2/></Private>}/>
        <Route path="/pay/v2/buy/cancel" element={<Private><KakaopayBuyCancelVersion2/></Private>}/>        
        <Route path="/pay/v2/buy/fail" element={<Private><KakaopayBuyFailVersion2/></Private>}/>
        <Route path="/pay/v2/buy/detail/:purchaseNo" element={<Private><KakaopayBuyDetailVersion2/></Private>}/>

        {/* 웹소켓 */}
        <Route path="/websocket/v1" element={<WebSocketV1BasicClient/>}/>

        {/* error */}
        <Route path="/account/block" element={<AccountBlock/>}/>

        {/* fallback route */}
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )
}