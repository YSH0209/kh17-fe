import Jumbotron from "@templates/Jumbotron";
import axios from "axios";
import { useAtom, useAtomValue } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { loginUserState } from "@utils/storage";
import { apiClient } from "@utils/reaxios";

export default function MyPage(){
    //jotai state 에 저장된 내 정보를 가져와서 서버에 나머지 정보를 요청해야함
    // const [ loginUser, setLoginUser ] = useAtom(loginUserState);
    //const loginUser = useAtomValue(loginUserState);
    const { accountId, accountNickname, accountLevel } = useAtomValue(loginUserState);

    const [ account, setAccount ] = useState(null);

    useEffect(()=>{
        loadData();
    },[]);

    const loadData = useCallback(async()=>{
        // const { data } = await axios.get(`/api/account/${accountId}`);
        // const { data } = await axios.get(`/api/account/me`);
        const { data } = await apiClient.get("/account/me");
        setAccount(data);
    },[accountId]);

    //주소를 완성해서 반환하는 메모
    const unionAddress = useMemo(()=>{
        if(account === null) return "없음";
        if(account.accountPost === null) return "없음";
        if(account.accountAddress1 === null) return "없음";
        if(account.accountAddress2 === null) return "없음";

        return `[${account.accountPost}] ${account.accountAddress1} ${account.accountAddress2}`;
    },[account]);

    return (<>
        <Jumbotron title={`${account?.accountNickname}님의 마이페이지`} content="개인정보 페이지 입니다"/>


        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">아이디</Col>
            <Col sm={9} className="text-secondary">{account?.accountId}</Col>
        </Row>   

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">이메일</Col>
            <Col sm={9} className="text-secondary">{account?.accountEmail}</Col>
        </Row>  

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">닉네임</Col>
            <Col sm={9} className="text-secondary">{account?.accountNickname}</Col>
        </Row> 

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">생일</Col>
            <Col sm={9} className="text-secondary">{account?.accountBirth}</Col>
        </Row>    

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">전화번호</Col>
            <Col sm={9} className="text-secondary">{account?.accountContact}</Col>
        </Row>  


        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">주소</Col>
            <Col sm={9} className="text-secondary">{unionAddress}</Col>
        </Row>  

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">레벨</Col>
            <Col sm={9} className="text-secondary">{account?.accountLevel}</Col>
        </Row>   

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">가입일</Col>
            <Col sm={9} className="text-secondary">{account?.accountJoin}</Col>
        </Row>   

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">최근로그인</Col>
            <Col sm={9} className="text-secondary">{account?.accountLogin}</Col>
        </Row>    

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">비밀번호변경일</Col>
            <Col sm={9} className="text-secondary">{account?.accountChange}</Col>
        </Row>   
         
        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">포인트</Col>
            <Col sm={9} className="text-secondary">{account?.accountPoint} point</Col>
        </Row>  

        <Row className="mt-4">
            <Col sm={3} className="fw-bold text-info">상태메세지</Col>
            <Col sm={9} className="text-secondary">{account?.accountMessage}</Col>
        </Row>    



        </>
        )}