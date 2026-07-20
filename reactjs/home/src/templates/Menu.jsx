import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { loginUserState, isAdminState } from "@utils/storage";
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { RESET } from 'jotai/utils';
import { logoutActionState } from "@utils/storage";
import { isLoginState } from "@utils/storage";



export default function Menu() {
    //메뉴에서는 로그인 상태 데이터가 필요하다
    const [loginUser, setLoginUser] = useAtom(loginUserState);
    const [adminUser, setAdminUser] = useAtom(loginUserState);

    //읽기 전용 atom을 불러오는 법
    // const [ isLogin ] = useAtom(isLoginState);
    const isLogin = useAtomValue(isLoginState);
    //어드민 판정 함수
    const isAdmin = useAtomValue(isAdminState);
    //로그아웃 함수
    const logoutAction = useSetAtom(logoutActionState);


    return (<>
        <Navbar expand="md" className="bg-body-tertiary sticky-top"
            bg="dark" data-bs-theme="dark">
            {/* 메뉴 메인 컨테이너 */}
            <Container fluid>
                {/* 메인 브랜드 로고 */}
                <Navbar.Brand as={Link} to="/">KH정보교육원</Navbar.Brand>
                {/* 접이식 버튼(좁은 화면에서만 보임) */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* 접이식 영역(좁은 화면에서만 보임) */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* 
                        <Nav.Link as={Link} to="/country/list">국가정보</Nav.Link>
                        <Nav.Link as={Link} to="/country/search">국가명검색</Nav.Link>
                        <Nav.Link as={Link} to="/lecture/list">강좌정보</Nav.Link>
                        <Nav.Link as={Link} to="/book/list">도서정보</Nav.Link>
                        <Nav.Link as={Link} to="/book/spa">도서정보2</Nav.Link>
                         */}

                        <NavDropdown title="데이터베이스" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/country/list">국가정보</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/country/search">국가명검색</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/country/complex">국가복합검색</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/lecture/list">강좌정보</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/book/list">도서정보</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/book/spa">도서정보(SPA)</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/session/test">세션테스트</Nav.Link>
                    </Nav>
                    <Nav>
                        {isLogin === true && (<>
                            {isAdmin === true && (<>
                                <Nav.Link as={Link} to="">관리메뉴</Nav.Link>
                            </>)}
                            {isAdmin === false && (<>
                                <Nav.Link as={Link} to="/account/mypage">내정보</Nav.Link>
                            </>)}
                            <Nav.Link onClick={logoutAction}>로그아웃</Nav.Link>
                        </>)}
                        {isLogin !== true && (<>
                            <Nav.Link as={Link} to="/account/join">회원가입</Nav.Link>
                            <Nav.Link as={Link} to="/account/login">로그인</Nav.Link>
                        </>)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>)
}
