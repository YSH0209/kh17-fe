import { Link } from "react-router-dom";

export default function Home(){

    return(<>
        <h1>첫 페이지!</h1>

        {/* React 에선 a태그를 사용하지 않음! */}


        Link태그
        <h2><Link to="/test1">테스트1번(절대)</Link></h2>
        {/* <h2><Link to="./test1">테스트1번(상대)</Link></h2> */}
        <h2><Link to="/test2">테스트2번(절대)</Link></h2>
        {/* <h2><Link to="./test2">테스트2번(상대)</Link></h2> */}

        
    </>)
}