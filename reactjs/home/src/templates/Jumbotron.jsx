import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//점보트론
export default function Jumbotron({ title = "테스트 제목", content = "" }) {

    return (
        <Row>
            <Col>
                <div className="row">
                    <div className="col">
                        <div className="p-4 text-primary rounded">
                            <h1>{title}</h1>
                            <p className="text-muted">{content}</p>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>

    );
}

