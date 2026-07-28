import Jumbotron from "@templates/Jumbotron"
import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom"
import { apiClient } from "@utils/reaxios";
import { Button, Col, Placeholder, Row } from "react-bootstrap";
import LoadingText from "@templates/LoadingText";
import { FaLock, FaSpinner, FaUnlock, FaUserLock } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { MdOutlinePassword } from "react-icons/md";

export default function AdminUserDetail() {
    
    //딱 한번만 최초 시점에 그 누구보다 빠르게 불러오는 처리 담당 (변경 불가)
    const { accountId } = useParams();

    const [account, setAccount] = useState(null);
    useEffect(()=>{
        loadData();
    }, []);

    const loadData = useCallback(async ()=>{
        const { data } = await apiClient.get(`/admin/${accountId}`);
        setAccount(data);
    }, []);

    //주소를 완성해서 반환하는 메모
    const unionAddress = useMemo(()=>{
        if(account === null) return undefined;
        if(account.accountPost === null) return "";
        if(account.accountAddress1 === null) return "";
        if(account.accountAddress2 === null) return "";
        return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
    }, [account]);


    const block = useCallback(async ()=>{
        //확인창
        const result = await Swal.fire({
            title:`정말 ${account.accountBlock === "N" ? "차단" : "차단 해제"}하시겠습니까?`,
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"확인",
            cancelButtonText:"취소",
            confirmButtonColor:"#d63031",
            cancelButtonColor:"#b2bec3"
        });
        if(result.isConfirmed === false) return;//취소

        const { data } = await apiClient.patch(`/admin/block/${accountId}`);
        //console.log(data);
        setAccount(data);

        //알림 처리
        if(data.accountBlock === "Y") {
            toast.error("회원 차단이 완료되었습니다");
        }
        else {
            toast.success("회원 차단이 해제되었습니다");
        }
    }, [account]);

    //로딩중인 화면을 따로 보여줄 때
    // if(account === null) {
    //     return (<h1>로딩중인 화면</h1>)
    // }

    // const sending = useRef(false);
    const [ sending, setSending ] = useState(false);


    const createTempPassword = useCallback(async()=>{
         //확인창
        const result = await Swal.fire({
            title:"임시 비밀번호로 변경하시겠습니까?",
            icon:"warning",
            showCancelButton:true,
            confirmButtonText:"확인",
            cancelButtonText:"취소",
            confirmButtonColor:"#d63031",
            cancelButtonColor:"#b2bec3"
        });

        if(result.isConfirmed === false) return;//취소

        if(sending === true) return;
        setSending(true);

        try{
            const { data } = await apiClient.post(`/admin/tempPassword/${accountId}`);
            toast.success("임시 비밀번호가 발송되었습니다");
        }
        catch(e){
            toast.error("이메일 발송에 실패하였습니다");
        }

        setSending(false);
    },[]);





    //로딩완료시 화면
    return (<>
        
        <Jumbotron title={`${account?.accountNickname ?? ""}님의 개인 정보`}/>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountId} width={100}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountNickname} width={120}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountEmail} width={200}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountBirth} width={100}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountContact} width={120}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={unionAddress} width={"100%"}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLevel} width={60}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountPoint} width={50}/>
                <span className="ms-2">point</span>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">차단상태</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountBlock} width={50}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountJoin} width={240}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLogin} width={240}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountChange} width={240}/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountMessage} width={"100%"} line={3}/>
            </Col>
        </Row>

        {/* 관리자 제어용 버튼들 */}
        <Row className="mt-5">
            <Col className="text-end">
                {/* 차단/해제 버튼 : account.accountBlock 상태에 따라 달라짐 */}
                <Button variant="danger" className="w-md-auto mb-2 md-auto me-md-2" onClick={block}>
                    {account?.accountBlock === "Y" ? (<>
                        <FaUnlock/>
                        <span className="ms-2">차단 해제하기</span>
                    </>) : (<>
                        <FaLock/>
                        <span className="ms-2">차단 설정하기</span>
                    </>)}
                </Button>

                {/* 임시 비밀번호 발급 */}
                <Button variant="warning" className="w-md-auto" onClick={createTempPassword}
                        disabled={sending === true} >
                    {sending === false && (<>
                        <MdOutlinePassword />
                        <span className="ms-2">임시 비밀번호 설정하기</span>
                    </>)}
                    {sending === true && (<>
                        <FaSpinner className="spin" />
                        <span className="ms-2">변경 메일 발송 중...</span>
                    </>)}
                </Button>
            </Col>
        </Row>

    </>)
}