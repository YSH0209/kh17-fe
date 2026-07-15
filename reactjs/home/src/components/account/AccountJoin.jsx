import Jumbotron from "@templates/Jumbotron";
import { useCallback, useMemo, useRef, useState } from "react";
import { Button, Col, Form, Row, Toast } from "react-bootstrap";
import { FaAsterisk, FaCheck, FaMagnifyingGlass, FaPaperPlane, FaPlus, FaUserPlus, FaXmark } from "react-icons/fa6";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { RiEye2Line } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";
import { useKakaoPostcodePopup } from "react-daum-postcode";

export default function AccountJoin() {
    //kakao post
    const open = useKakaoPostcodePopup("//t1.kakaocdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");


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
        // accountId: null,
        accountId: { valid: null, code: null },
        accountPassword: null,
        accountPassword2: null,
        accountEmail: { valid: null, code: null },
        accountNickname: { valid: null, code: null },
        accountBirth: null,
        accountContact: null,
        accountPost: null,
        accountAddress1: null,
        accountAddress2: null,
        accountMessage: null
    });

    const [visible, setVisible] = useState({
        accountPassword: false,
        accountPassword2: false,
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
    const checkAccountId = useCallback(async e => {
        const regex = /^[a-z][a-z0-9]{4,19}$/;
        const valid = regex.test(account.accountId);
        if (valid === false) { //아이디 형식 오류
            setResult(prev => ({
                ...prev,
                accountId: { clazz: "is-invalid", code: "format" }

            }));
            return;
        }
        //형식은 통과
        const response = await axios.get(`/api/account/check-id/${account.accountId}`)
        const clazz = response.data === true ? "is-valid" : "is-invalid";
        const code = response.data === true ? null : "duplicate";
        setResult(prev => ({
            ...prev,
            accountId: { clazz: clazz, code: code }
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
    const checkAccountNickname = useCallback(async e => {
        const regex = /^[가-힣A-Za-z0-9]{1,10}$/;
        const valid = regex.test(account.accountNickname);
        if (valid === false) { //형식 위반
            setResult(prev => ({
                ...prev,
                accountNickName: { clazz: "is-invalid", code: "format" }
            }));
            return;
        } //형식 통과 -> 중복검사
        const { data } = await axios.get(`/api/account/check-nickname/${account.accountNickname}`)
        const clazz = data ? "is-valid" : "is-invalid";
        const code = data ? null : "duplicate";
        setResult(prev => ({
            ...prev,
            accountNickname: { clazz: clazz, code: code }
        }));
    }, [account]);

    //이메일 검사
    const checkAccountEmail = useCallback(async e => {
        const regex = /^([a-z][a-z0-9]{4,19})@([A-Za-z0-9\-\.]{1,})(\.[a-z]{2,3})$/;
        const valid = regex.test(account.accountEmail);
        if (valid === false) {
            setResult(prev => ({
                ...prev,
                accountEmail: { clazz: "is-invalid", code: "format" }
            }));
        }
        //형식 통과 -> 중복검사
        const { data } = await axios.get(`/api/account/check-email/${account.accountEmail}`)
        const clazz = data ? "is-valid" : "is-invalid";
        const code = data ? null : "nuplicate";
        setResult(prev => ({
            ...prev,
            accountEmail: { clazz: clazz, code: code }
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

    //ref - 태그 참조용 동기방식의 데이터
    // - 태그를 제어하는 리모컨으로 사용
    // - 언제 어디서나 일정한 값을 가져야 하는 데이터에 사용
    // (ex) 로딩중과 같은 상태 데이터
    // - 문법 : const 변수 = useRef(초기값);
    const address2ref = useRef();

    //우편번호 처리
    const addressSearch = useCallback((e) => {
        const { tagName, value } = e.target;
        if (tagName === "INTPUT" && value.length !== "") return;

        open({
            onComplete: (data) => {
                // console.log(data);
                //- userSelectedType : 선택한 주소의 유형 (R or J)
                //- roadAddress : 도로명 주소(신주소)
                //- jibunAddress : 지번 주소(구주소)
                //- zonecode : 우편번호
                const zonecode = data.zonecode;
                const address = data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;


                //주소 변경
                setAccount(prev => ({
                    ...prev,
                    accountPost: zonecode,
                    accountAddress1: address,
                    accountAddress2: "",
                }));

                //상세주소창에 포커를 줄 수 있나?
                //기존코드
                // document.querySelector("[name = accountAddress2]").focus();

                //리액트는? ref의 current필트를 사용
                address2ref.current.focus();

            }
        });
    }, []);



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

    const checkAccountMessage = useCallback(e => {
        setResult(prev => ({
            ...prev,
            accountMessage: "is-valid"
        }));
    }, [account]);


    //주소삭제
    const closeButton = useCallback(e => {
        // console.log(e.currnetTarget.style.opacity); //기존 this와 완전히 같은 역활
        if (parseInt(e.currentTarget.style.opacity) === "0") return;

        //입력값 초기화
        setAccount(prev => ({
            ...prev,
            accountPost: "",
            accountAddress1: "",
            accountAddress2: "",
        }));
        //검사결과 초기화
        setResult(prev => ({
            ...prev,
            accountPost: null,
            accountAddress1: null,
            accountAddress2: null
        }));

    }, []);



    const allValid = useMemo(() => {
        //필수항목
        if (result.accountId.clazz !== "is-valid") return false;
        if (result.accountPassword !== "is-valid") return false;
        if (result.accountPassword2 !== "is-valid") return false;
        if (result.accountNickname.clazz !== "is-valid") return false;
        if (result.accountEmail.clazz !== "is-valid") return false;

        //선택항목
        if (result.accountBirth !== "is-invalid") return false;
        if (result.accountContact !== "is-invalid") return false;
        if (result.accountPost !== "is-invalid") return false;
        if (result.accountAddress1 !== "is-invalid") return false;
        if (result.accountAddress2 !== "is-invalid") return false;
        if (result.accountMessage !== "is-invalid") return false;

        return true;
    }, [result]);



    const send = useCallback(async () => {
        const response = await axios.post("/api/account/", account);
        toast.success("계정 등록이 완료 되었습니다");
        Navigate("/");

    }, [account]);

    //주소 삭제 버튼이 나와야되는지 판정하기 위한 memo
    const isAddressWritten = useMemo(() => {
        if (account.accountPost !== "") return true;
        if (account.accountAddress1 !== "") return true;
        if (account.accountAddress2 !== "") return true;
        return false;
    }, [
        account.accountPost,
        account.accountAddress1,
        account.accountAddress2
    ]);

    //이메일 인증 관련 기능들
    const sendCert = useCallback(async()=>{
        try{

            const response = await axios.post(
                "/service/cert/send", 
                {certEmail : account.accountEmail}
            );
            console.log("이메일 발송 완료");
        }
        catch(e){
            toast.error("이메일 발송 오류");
        }
    },[account.accountEmail]);


    //인증번호
    const [ certNumber, setCertNumber ] = useState("");
    //숫자가 아닌 글자를 쳐냄
    const changeCertNumber = useCallback(e=>{
        const replacement = e.target.value.replace(/[^0-9]+/g, "");
        setCertNumber(replacement);
    },[]);


    const checkCert = useCallback(async ()=>{
        const { data } = await axios.post(
            "/service/cert/check",
            { certEmail : account.accountEmail, certNumber : certNumber }
        );
        console.log("결과 : ", data.valid);
    }, [account.accountEmail, certNumber]);


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
                    className={result.accountId.clazz} />
                <div className="valid-feedback">아이디 설정이 완료되었습니다</div>
                <div className="invalid-feedback">
                    {result.accountId.code === "format" && (<>
                        아이디는 영문소문자로 시작하며 숫자 포함 5~20 글자로 작성해야 합니다
                    </>)}
                    {result.accountId.code === "duplicate" && (<>
                        아이디가 이미 사용중 입니다. 다른 아이디를 작성하세요
                    </>)}
                </div>
            </Col>
        </Row>

        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>비밀번호</span>
                <FaAsterisk className="text-danger" />

                {visible.accountPassword === true ? (
                    <RiEye2Line className="text-danger ms-4" onClick={e => {
                        setVisible(prev => ({
                            ...prev,
                            accountPassword: false
                        }));
                    }} />
                ) : (
                    <RiEyeCloseLine className="text-info ms-4" onClick={e => {
                        setVisible(prev => ({
                            ...prev,
                            accountPassword: true
                        }));
                    }} />
                )}
            </Form.Label>
            <Col sm={9}>
                <Form.Control type={visible.accountPassword ? "type" : "password"} name="accountPassword"
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

                {visible.accountPassword2 === true ? (
                    <RiEye2Line className="text-danger ms-4" onClick={e => {
                        setVisible(prev => ({
                            ...prev,
                            accountPassword2: false
                        }));
                    }} />
                ) : (
                    <RiEyeCloseLine className="text-info ms-4" onClick={e => {
                        setVisible(prev => ({
                            ...prev,
                            accountPassword2: true
                        }));
                    }} />
                )}
            </Form.Label>
            <Col sm={9}>
                <Form.Control type={visible.accountPassword2 ? "text" : "password"} name="accountPassword2"
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
                <Form.Control type="text" inputMode="email" name="accountNickname.clazz"
                    value={account.accountNickname.clazz} onChange={changeStringValue}
                    placeholder="한글, 영문, 숫자 10자 이내"
                    onBlur={checkAccountNickname}
                    className={result.accountNickname.clazz} />
                <div className="valid-feedback">훌륭한 닉네임 입니다!</div>
                <div className="invalid-feedback">
                    {result.accountNickname.code === "format" && (<>
                        한글, 영어, 숫자, 10글자 이내로 작성해야 합니다
                    </>)}
                    {result.accountNickname.code === "duplicate" && (<>
                        이미 사용중인 닉네임 입니다
                    </>)}
                </div>
            </Col>
        </Row>



        {/* 이메일은 인증번호 처리가 추가로 필요 */}
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>이메일</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <div className="d-flex flex-wrap">

                    <Form.Control type="text" name="accountEmail"
                        value={account.accountEmail} onChange={changeStringValue}
                        placeholder="대충 이메일을 설정하란 글"
                        onBlur={checkAccountEmail}
                        className={`${result.accountEmail} w-auto d-inline-block`} />
                    <div className="valid-feedback">이메일 설정이 완료되었습니다</div>
                    {/* 인증번호 발송 버튼 */}
                    <Button variant="info" className="ms-2" onClick={sendCert}>
                        <FaPaperPlane />
                        <span className="ms-2 d-none d-sm-inline">인증번호 보내기</span>
                    </Button>
                    <div className="valid-feedback">이메일 설정이 완료되었습니다</div>
                    <div className="invalid-feedback">형식오류 or 사용중</div>
                </div>
            </Col>
        </Row>

        <Row className="mt-2">
            <Col sm={ {span:9, offset:3} }>
                    <div className="d-flex">
                <Form.Control type="text" placeholder="인증번호"
                    value={certNumber} onChange={changeCertNumber}
                     className="w-auto"/>
                        <Button variant="success" className="ms-2" onClick={checkCert}>
                            <FaCheck />
                            <span className="ms-2 d-none d-sm-inline">인증번호 확인</span>
                        </Button>
                        <div className="valid-feedback">인증번호 확인이 완료되었습니다</div>
                        <div className="invalid-feedback">인증번호가 일치하지 않습니다</div>
                    </div>
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
                    {/* 우편번호 입력창 */}
                    <Form.Control type="text" inputMode="rumeric" name="accountPost"
                        value={account.accountPost}
                        readOnly onClick={addressSearch}
                        placeholder="우편번호"
                        className={`${result.accountPost} w-auto d-inline-block`} onBlur={checkAccountAddress} />
                    {/* 주소검색 버튼 */}
                    <Button variant="success" className="ms-2 d-sm-inline" onClick={addressSearch}>
                        <FaMagnifyingGlass />
                        <span>주소검색</span>
                    </Button>
                    {/* x버튼 */}
                    <Button variant="danger" className="ms-2 d-sm-inline" onClick={closeButton}
                        style={
                            {
                                opacity: isAddressWritten === true ? 100 : 0,
                                transition: "opacity 0.1s ease-out",
                            }
                        }>
                        <FaXmark />
                        <span>주소 삭제</span>
                    </Button>
                </div>
            </Col>
        </Row>


        <Row className="mt-2">
            {/* <Col sm={9} className="offset-sm-3"> */}
            <Col sm={{ span: 9, offset: 3 }}>
                <Form.Control type="text" inputMode="rumeric" name="accountAddress1"
                    value={account.accountAddress1}
                    readOnly onClick={addressSearch}
                    className={result.accountAddress1}
                    placeholder="기본주소" />
            </Col>
        </Row>

        <Row className="mt-2">
            {/* <Col sm={9} className="offset-sm-3"> */}
            <Col sm={{ span: 9, offset: 3 }}>
                <Form.Control type="text" name="accountAddress2"
                    value={account.accountAddress2}
                    onChange={changeStringValue}
                    className={result.accountAddress2}
                    placeholder="상세주소"
                    ref={address2ref} />
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
                <Button type="button" variant="success" className="w-100"
                    onClick={send} disabled={allValid === false} >
                    <FaUserPlus className="me-2" />
                    <span>가입하기</span>
                </Button>
            </Col>
        </Row>

    </>)

}