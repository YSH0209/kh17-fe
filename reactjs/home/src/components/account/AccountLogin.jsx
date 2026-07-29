import Jumbotron from "@templates/Jumbotron";
import axios from "axios";
import { useAtom, useSetAtom } from "jotai";
import { useCallback, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaRightToBracket } from "react-icons/fa6";
import Swal from "sweetalert2";
import { loginUserState } from "@utils/storage";
import { useNavigate } from "react-router-dom";
import { loginActionState } from "@utils/storage";
import { authClient } from "@utils/reaxios";

export default function AccountLogin() {
    //state
    const [account, setAccount] = useState({
        accountId : "",
        accountPassword : ""
    });
    //jotai state
    //const [loginUser, setLoginUser] = useAtom(loginUserState);

    //쓰기 전용 atom
    //const [_, loginAction] = useAtom(loginActionState);
    const loginAction = useSetAtom(loginActionState);

    //navigate
    const navigate = useNavigate();

    //입력
    const changeStringValue = useCallback(e=>{
        const { name, value } = e.target;
        setAccount(prev=>({
            ...prev,
            [name] : value
        }));
    }, []);
    //로그인
    const sendLogin = useCallback(async ()=>{
        //미입력 시 차단
        if(account.accountId === "" && account.accountPassword === "") {
            await Swal.fire("모든 정보를 입력하세요");
            return;
        }

        try {
            //const {data} = await axios.post("/service/auth/login", account);
            const {data} = await authClient.post("/login", account);
            //로그인 성공 → data를 jotai storage에 저장하자!
            //console.log(data);
            //setLoginUser(data);//jotai storage에 저장 완료
            // loginAction(data);//jotai setter atom 사용

            //data 에서 needUpdate와 나머지를 뽑아내서 나눠서 사용 (구조분해할당)
            const { needUpdate, ...userData } = data; //data는 needUpdate랑 나머지 userData의 혼합체임
            loginAction(userData);

            //로그인 성공 시에도 경우가 나눠짐
            // - data 에 needUpdate 항목의 값에 따라 이동하는 페이지가 달라진다
            if(needUpdate){ //비밀번호를 바꾼지 30일 초과가 되어 업데이트가 필요한 상황
                navigate("/account/needUpdate");
            }
            else{ //비밀번호 업데이트가 필요하지 않은 일반적 상황
                navigate("/");
            }

        }
        catch(e){
            //로그인 실패의 경우가 나눠짐
            // - 404 : 정보 불일치
            // - 403 : 차단된 회원
            // console.log(e.status); //우리가 원하는 것
            // console.log(typeof e.status); //자료형 확인
            if(e.status === 403){
                navigate("/account/block");
            }   
            else if(e.status === 404){
                await Swal.fire("정보가 일치하지 않습니다");
            }   
            else{ //500
                 await Swal.fire("서버의 요청을 불러올 수 없습니다");
            }          
        }
    }, [account]);

    return (<>
        <Jumbotron title="회원 로그인" content="로그인을 위한 정보를 입력해주세요"/>

        <Row className="mt-4">
            <Form.Label column sm={3}>아이디</Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountId" value={account.accountId}
                        onChange={changeStringValue} placeholder="User ID"
                        autoFocus/>
            </Col>
        </Row>
        <Row className="mt-4">
            <Form.Label column sm={3}>비밀번호</Form.Label>
            <Col sm={9}>
                <Form.Control type="password" name="accountPassword" 
                        value={account.accountPassword}
                        onChange={changeStringValue} placeholder="User Password"/>
            </Col>
        </Row>

        <Row className="mt-5">
            <Col className="text-end">
                <Button variant="success" size="lg" onClick={sendLogin}>
                    <FaRightToBracket/>
                    <span className="ms-2">로그인</span>
                </Button>
            </Col>
        </Row>
    </>)
}