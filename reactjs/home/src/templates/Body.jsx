import { Route, Routes } from 'react-router-dom'
import BookList from '../components/book/BookList'
import CountryList from '../components/country/CountryList'
import LectureList from '../components/lecture/LectureList'
import Home from '../components/Home'
import NotFound from '../Error/NotFound'
import CountryAdd from '../components/country/CountryAdd'
import CountryDetail from '../components/country/CountryDetail'
import LectureAdd from '../components/lecture/LectureAdd'
import LectureDetail from '../components/lecture/LectureDetail'
import CountryEdit from '../components/country/CountryEdit'


export default function Body() {

    return (<>
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/country/list" element={<CountryList />}></Route>
            <Route path="/country/add" element={<CountryAdd />}></Route>
            {/* 제일 마지막에 적혀있는 값을 countryNo라는 이름으로 관리하겠다 */}
            <Route path="/country/detail/:countryNo" element={<CountryDetail/>}></Route>
            <Route path="/country/edit/:countryNo" element={<CountryEdit/>}/>

            <Route path="/lecture/list" element={<LectureList />}></Route>
            <Route path="/lecture/add" element={<LectureAdd />}></Route>
            <Route path="/lecture/detail/:lectureNo" element={<LectureDetail/>}></Route>

            <Route path="/book/list" element={<BookList />}></Route>

            {/* fallback route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </>)
}