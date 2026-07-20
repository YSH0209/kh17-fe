import { Route, Routes } from 'react-router-dom'
import BookList from '@components/book/BookList'
import BookAdd from '@components/book/BookAdd'
import BookDetail from '@components/book/BookDetail'
import BookEdit from '@components/book/BookEdit'
import CountryList from '@components/country/CountryList'
import LectureList from '@components/lecture/LectureList'
import Home from '@components/Home'
import LectureAdd from '@components/lecture/LectureAdd'
import LectureDetail from '@components/lecture/LectureDetail'

import CountryAdd from '@components/country/CountryAdd'
import CountryDetail from '@components/country/CountryDetail'
import CountryEdit from '@components/country/CountryEdit'
import CountrySearch from '@components/country/CountrySearch'
import CountryComplexSearch from '@components/country/CountryComplexSearch'

import AccountJoin from '@components/account/AccountJoin'
import AccountJoinSuccess from '@components/account/AccountJoinSuccess'
import AccountJoinFail from '@components/account/AccountJoinFail'
import AccountLogin from '@components/account/AccountLogin'
import MyPage from '@components/account/MyPage'

import TestMain from "@components/session/TestMain";

import NotFound from '@error/NotFound'

export default function Body() {

    return (<>
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/country/list" element={<CountryList />}></Route>
            <Route path="/country/add" element={<CountryAdd />}></Route>
            {/* 제일 마지막에 적혀있는 값을 countryNo라는 이름으로 관리하겠다 */}
            <Route path="/country/detail/:countryNo" element={<CountryDetail/>}></Route>
            <Route path="/country/edit/:countryNo" element={<CountryEdit/>}/>
            <Route path="/country/search" element={<CountrySearch/>}></Route>
            <Route path="/country/complex" element={<CountryComplexSearch/>}></Route>
            

            <Route path="/lecture/list" element={<LectureList />}></Route>
            <Route path="/lecture/add" element={<LectureAdd />}></Route>
            <Route path="/lecture/detail/:lectureNo" element={<LectureDetail/>}></Route>

            <Route path="/book/list" element={<BookList />}></Route>
            <Route path="/book/add" element={<BookAdd />}></Route>
            <Route path="/book/detail/:bookId" element={<BookDetail />}></Route>
            <Route path="/book/edit/:bookId" element={<BookEdit />}></Route>

            <Route path="/account/join" element={<AccountJoin />}></Route>
            <Route path="/account/joinSuccess" element={<AccountJoinSuccess />}></Route>
            <Route path="/account/joinFail" element={<AccountJoinFail />}></Route>
            <Route path="/account/login" element={<AccountLogin />}></Route>
            <Route path="/account/mypage" element={<MyPage />}></Route>

            {/* 세션 테스트 */}
            <Route path="/session/test" element={<TestMain/>}/>


            {/* fallback route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>)
}