import Jumbotron from "@templates/Jumbotron";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AccountJoinSuccess(){

    return(<>
        <Jumbotron title="회원 가입 성공" content="가입해주셔서 감사합니다"/>
        
        <Row className="mt-4">
            <Col>
                <Button as={Link} to={"/account/login"}>
                    <span className="ms-2">로그인하기</span>
                </Button>
            </Col>
        </Row>

        
    </>)
}