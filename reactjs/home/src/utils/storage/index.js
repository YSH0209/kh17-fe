//통합 상태(state) 저장소
//utils/storage/index.js
//- 통합하여 관리할 데이터들을 죠-타이(jotai) 기술에서 제공하는 도구로 생성한뒤 내보내기
//- 필요한 컴포넌트에서 여기서 만든 도구들을 import 하여 사용 (properties로 전달할 필요가 없다)

//- 생성방법 : atom 함수 사용

import { atom } from "jotai";

//- TestMain, TestLeft, TestRight 에서 공유할 count라는 이름의 통합상태(atom)을 생성

//const [ count, setCount ] = useState(0);
export const countState = atom(0);



