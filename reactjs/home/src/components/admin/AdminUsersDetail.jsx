import { useCallback, useEffect, useMemo, useState } from "react"
import Jumbotron from "@templates/Jumbotron";
import { Col, Placeholder, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import LoadingText from "@templates/LoadingText";
import { union } from "lodash";


export default function AdminUsersDetail() {

    //딱 한번 최초 시점에 누구보다 빠르게 불러오는 처리 담당(변경불가)
    const { accountId } = useParams();

    const [account, setAccount] = useState(null);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        const { data } = await apiClient.get(`/admin/${accountId}`);
        setAccount(data);
    }, []);

    //주소를 완성해서 반환하는 메모
    const unionAddress = useMemo(() => {
        if (account === null) return undefined;
        if (account.accountPost === null) return "";
        if (account.accountAddress1 === null) return "";
        if (account.accountAddress2 === null) return "";
        return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
    }, [account]);


    // //로딩중인 화면을 따로 보여줄 때
    // if(account === null){
    //     return (<h1>로딩중인 화면</h1>)
    // }


    //로딩 완료시 화면
    return (<>
        <Jumbotron title={`${account?.accountNickname}님의 개인 정보`} />


        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountId} width={100} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountNickname} width={120} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountEmail} width={200} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생년월일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountBirth} width={160} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">연락처</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountContact} width={140} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={unionAddress} width={300} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">등급</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLevel} width={60} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountPoint} width={50} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountJoin} width={240} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종로그인</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountLogin} width={240} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최종변경일</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountChange} width={240} />
            </Col>
        </Row>

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">
                <LoadingText value={account?.accountMessage} width={"100%"} line={3} />
            </Col>
        </Row>

    </>)
}