import Jumbotron from "@templates/Jumbotron";
import { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaCalendar, FaLock, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import { useAtomValue } from "jotai";
import { loginUserState } from "@utils/storage";

export default function AccountNeedUpdate() {

    const loginUser = useAtomValue(loginUserState);

    const navigate = useNavigate();

    const remindMeLater = useCallback(async ()=>{
        const { data } = await apiClient.patch(`/account/remindMeLater/${loginUser.accountId}`);
        navigate("/");
    }, []);

    return (<>
        <Jumbotron title="비밀번호 변경 필요 안내"/>

        <Row className="mt-5">
            <Col>
                비밀번호를 변경한지 오래되어 보안상 위험할 수 있습니다.<br/>
                변경을 권장합니다.
            </Col>
        </Row>
        <Row className="mt-5">
            <Col>
                <Button as={Link} to={"/account/password"} 
                                variant="success" size="lg"
                                className="w-100">
                    <FaLock/>
                    <span className="ms-2">비밀번호 변경하기</span>
                </Button>

                <Button variant="secondary" size="md"
                                as={Link} to={"/"}
                                className="w-100 mt-5">
                    <FaXmark/>
                    <span className="ms-2">나중에 변경하기</span>
                </Button>

                <Button variant="link" size="md" onClick={remindMeLater}
                            className="w-100 mt-2 text-secondary">
                    <FaCalendar/>
                    <span className="ms-2">30일 뒤에 알리기</span>
                </Button>
            </Col>
        </Row>
    </>)
}