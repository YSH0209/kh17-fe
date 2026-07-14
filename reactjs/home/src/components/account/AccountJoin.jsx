import Jumbotron from "@templates/Jumbotron";
import { useCallback, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaAsterisk, FaMagnifyingGlass, FaPlus, FaUserPlus, FaXmark } from "react-icons/fa6";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AccountJoin() {
    //state
    const [account, setAccount] = useState({
        accountId: "",
        accountPassword: "",
        accountPassword2: "",
        accountEmail: "",
        accountNickname: "",
        accountBirth: "",
        accountContact: "",
        accountPost: "",
        accountAddress1: "",
        accountAddress2: "",
        accountMessage: ""
    });

    const [result, setResult] = useState({
        accountId: null,
        accountPassword: null,
        accountPassword2: null,
        accountEmail: null,
        accountNickname: null,
        accountBirth: null,
        accountContact: null,
        accountPost: null,
        accountAddress1: null,
        accountAddress2: null,
        accountMessage: null
    });

    //callback
    //- 입력
    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;
        setAccount(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    //- 검사
    //아이디 검사
    const checkAccountId = useCallback(e => {
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountId: clazz
        }));
    }, [account]);

    //비밀번호 검사
    const checkAccountPassword = useCallback(e => {
        const regex = /^(?=.*?[A-Z]+)(?=.*?[a-z]+)(?=.*?[0-9]+)(?=.*?[\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\'\"\`\~\<\>\.\,\/\?\\\|]+)[A-Za-z0-9\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\'\"\`\~\<\>\.\,\/\?\\\|]{8,16}$/;
        const valid = regex.test(account.accountPassword);
        const clazz = valid ? "is-valid" : "is-invalid";

        //비밀번호 확인 검사
        const valid2 = account.accountPassword.length > 0
            && account.accountPassword === account.accountPassword2;
        const clazz2 = valid2 ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountPassword: clazz,
            accountPassword2: clazz2
        }));

    }, [account]);

    //닉네임 검사
    const checkAccountNickname = useCallback(e => {
        const regex = /^[가-힣A-Za-z0-9]{1,10}$/;
        const valid = regex.test(account.accountNickname);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountNickname: clazz
        }));
    }, [account]);

    //이메일 검사
    const checkAccountEmail = useCallback(e => {
        const regex = /^([a-z][a-z0-9]{4,19})@([A-Za-z0-9\-\.]{1,})(\.[a-z]{2,3})$/;
        const valid = regex.test(account.accountEmail);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountEmail: clazz
        }));
    }, [account]);

    const checkAccountBirth = useCallback(e => {
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = account.accountBirth !== "" || regex.test(account.accountBirth);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountBirth: clazz
        }));
    }, [account]);

    const checkAccountContact = useCallback(e => {
        const regex = /^010[1-9][0-9]{7}$/;
        const valid = account.accountContact.length === 0 || regex.test(account.accountContact);
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountContact: clazz
        }));
    }, [account]);



    const checkAccountAddress = useCallback(e => {
        const empty = account.accountPost === "" && account.accountAddress1 === "" && account.accountAddress2 === "";
        const fill = account.accountPost !== "" && account.accountAddress1 !== "" && account.accountAddress2 !== "";
        const valid = empty || fill;
        const clazz = valid ? "is-valid" : "is-invalid";
        setResult(prev => ({
            ...prev,
            accountPost: clazz,
            accountAddress1: clazz,
            accountAddress2: clazz
        }));
    }, [account]);

    const checkAccountMessage = useCallback(e=>{
        setResult(prev=>({
            ...prev,
            accountMessage : "is-valid"
        }));
    },[account]);

    const allValid = useMemo(()=>{
        //필수항목
        if(result.accountId !== "is-valid") return false;
        if(result.accountPassword !== "is-valid") return false;
        if(result.accountPassword2 !== "is-valid") return false;
        if(result.accountNickname !== "is-valid") return false;
        if(result.accountEmail !== "is-valid") return false;

        //선택항목
        if(result.accountBirth !== "is-invalid") return false;
        if(result.accountContact !== "is-invalid") return false;
        if(result.accountPost !== "is-invalid") return false;
        if(result.accountAddress1 !== "is-invalid") return false;
        if(result.accountAddress2 !== "is-invalid") return false;
        if(result.accountMessage !== "is-invalid") return false;

        return true;
    },[result]);



    const send = useCallback(async () => {
        const response = await axios.post("/api/account/", account);
        toast.success("계정 등록이 완료 되었습니다");
        Navigate("/");

    }, [account]);


    return (<>
        <Jumbotron title="가입 정보 입력" content="부정확한 정보 입력이 화인된 경우 계정 이용이 제한될 수 있습니다" />

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>아이디</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountId"
                    value={account.accountId} onChange={changeStringValue}
                    placeholder="알파벳 소문자 시작, 숫자 포함 5~20자 이내"
                    onBlur={checkAccountId}
                    className={result.accountId} />
                <div className="valid-feedback">아이디 설정이 완료되었습니다</div>
                <div className="invalid-feedback">형식오류 or 사용중</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountPassword"
                    value={account.accountPassword} onChange={changeStringValue}
                    placeholder="대문자, 소문자, 숫자, 특수문자 포함 8~16자 이내"
                    onBlur={checkAccountPassword}
                    className={result.accountPassword} />
                <div className="valid-feedback">비밀번호 설정이 완료되었습니다</div>
                <div className="invalid-feedback">영문 대/소문자, 숫자, 특수문자를 반드시 포함하여 작성하세요</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호 확인</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountPassword2"
                    value={account.accountPassword2} onChange={changeStringValue}
                    placeholder="비밀번호를 한번 더 입력하세요"
                    onBlur={checkAccountPassword}
                    className={result.accountPassword2} />
                <div className="valid-feedback">비밀번호가 일치합니다</div>
                <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
            </Col>
        </Row>



        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>닉네임</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" inputMode="email" name="accountNickname"
                    value={account.accountNickname} onChange={changeStringValue}
                    placeholder="대충 닉네임 설정 하세요란 글"
                    onBlur={checkAccountNickname}
                    className={result.accountNickname} />
                <div className="valid-feedback">훌륭한 닉네임 입니다!</div>
                <div className="invalid-feedback">사용할 수 없는 닉네임 입니다</div>
            </Col>
        </Row>


        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>이메일</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountEmail"
                    value={account.accountEmail} onChange={changeStringValue}
                    placeholder="대충 이메일을 설정하란 글"
                    onBlur={checkAccountEmail}
                    className={result.accountEmail} />
                <div className="valid-feedback">이메일 설정이 완료되었습니다</div>
                <div className="invalid-feedback">형식오류 or 사용중</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>생년월일</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="date" name="accountBirth"
                    value={account.accountBirth} onChange={changeStringValue}
                    placeholder="대충 생일 설정하란 글"
                    onBlur={checkAccountBirth}
                    className={result.accountBirth} />
                <div className="invalid-feedback">날짜 형식이 올바르지 않습니다</div>
                {/* <div className="invalid-feedback">형식오류 or 사용중</div> */}
            </Col>
        </Row>


        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>연락처</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="accountContact"
                    value={account.accountContact} onChange={changeStringValue}
                    placeholder="- 을 제외한 숫자만 입력"
                    onBlur={checkAccountContact}
                    className={result.accountContact} />
                {/* <div className="valid-feedback">전화번호 설정이 완료되었습니다</div> */}
                <div className="invalid-feedback">연락처 형식이 올바르지 않습니다</div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>주소</span>
            </Form.Label>
            <Col sm={9}>
                <div className="d-flex">

                    <Form.Control type="text" inputMode="rumeric" name="accountPost"
                        value={account.accountPost} onChange={changeStringValue} placeholder="우편번호"
                        className={`${result.accountPost} w-auto d-inline-block`} onBlur={checkAccountAddress} />
                    <Button variant="success" className="ms-2">
                        <FaMagnifyingGlass />
                    </Button>
                    <Button variant="danger" className="ms-2">
                        <FaXmark />
                    </Button>
                </div>
            </Col>
        </Row>
        <Row className="mt-2">
            {/* <Col sm={9} className="offset-sm-3"> */}
            <Col sm={{ span: 9, offset: 3 }}>
                <Form.Control type="text" inputMode="rumeric" name="accountAddress1"
                    value={account.accountAddress1} onChange={changeStringValue}
                    className={result.accountAddress1} onBlur={checkAccountAddress}
                    placeholder="기본주소" />
            </Col>
        </Row>

        <Row className="mt-2">
            {/* <Col sm={9} className="offset-sm-3"> */}
            <Col sm={{ span: 9, offset: 3 }}>
                <Form.Control type="text" inputMode="rumeric" name="accountAddress2"
                    value={account.accountAddress2} onChange={changeStringValue}
                    className={result.accountAddress2} onBlur={checkAccountAddress}
                    placeholder="상세주소" />
                <div className="invalid-feedback">주소는 비우거나 모두 작성해야 합니다</div>
            </Col>
        </Row>


        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>상태메세지</span>
            </Form.Label>
            <Col sm={9}>
                <Form.Control as="textarea" rows={5} name="accountMessage"
                    value={account.accountMessage} onChange={changeStringValue}
                    onBlur={checkAccountMessage}
                    className={result.accountMessage} />
            </Col>
        </Row>


        <Row className="mt-5">
            <Col>
                <Button type="button" variant="success"  className="w-100"
                    onClick={send} disabled = {allValid === false} >
                    <FaUserPlus className="me-2" />
                    <span>가입하기</span>
                </Button>
            </Col>
        </Row>

    </>)

}