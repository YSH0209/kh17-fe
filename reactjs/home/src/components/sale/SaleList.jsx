import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useState } from "react";
import { apiClient } from "@utils/reaxios";
import { Row, Col, Badge } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import NoImage from "@assets/images/no-image.png";
import { Link } from "react-router-dom";

//무조건 상대경로로 불러올 때 ./ 부터 시작해야함 (파일명만 적으면 안됨)
import "./SaleList.css";


export default function SaleList() {
    //data
    const [items, setItems] = useState([]);

    const loadItems = useCallback(async () => {
        const { data } = await apiClient.post("/sale/list", {});
        //data는 백엔드에서의 SaleListResponseVO
        setItems(data.items);
    }, []);
    useEffect(() => {
        loadItems();
    }, []);

    //일회용 계산 함수
    const calculateDiscountPercent = useCallback(({ saleOriginalPrice, saleDiscountPrice }) => {
        return 100 - (saleDiscountPrice * 100 / saleOriginalPrice);
    }, []);

    //view
    return (<>
        <Jumbotron title="상품 목록" />

        {/* 상품 목록 - 카드 리스트 형태로 출력 */}
        <Row className="mt-5">
            <Col className="item-container">
                {items.map(item => {

                    //추가 코드 작성 (현재 회차에서만 유효한 코드)
                    const { saleOriginalPrice, saleDiscountPrice } = item;
                    const percent = saleDiscountPrice * 100 / saleOriginalPrice;
                    const discount = 100 - percent;
                    const result = discount.toLocaleString();

                    const isDiscount = saleOriginalPrice > saleDiscountPrice;

                    const imageUrl = `${import.meta.env.VITE_SERVER_URL}/api/attach/${item.attachNo}`;

                    return (
                        <div key={item.saleNo} className="item mb-4 p-2">

                            <Card key={item.saleNo} className="item mb-4">
                                <Card.Img variant="top"
                                    src={item.attachNo === null ? NoImage : imageUrl}
                                    style={{
                                        width: "auto",
                                        height: 200,
                                        objectFit: "contain",
                                        objectPosition: "top"

                                    }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-truncate">{item.saleName}</Card.Title>

                                    {/* as="div"를 추가하여 내부 div 사용이 가능하도록 수정 */}
                                    <Card.Text as="div">
                                        <div>
                                            <Badge bg="info">{item.saleCategory}</Badge>
                                        </div>
                                        <div className="mt-4 fs-4" style={{ height: 120 }}>
                                            {isDiscount ? (
                                                <>
                                                    <s className="text-mute">{item.saleOriginalPrice.toLocaleString()}원</s>
                                                    <br />
                                                    <b className="text-danger">{item.saleDiscountPrice.toLocaleString()}원</b>
                                                    ( ▼ {result} % )
                                                </>
                                            ) : (
                                                <>
                                                    <b>{item.saleOriginalPrice.toLocaleString()} 원</b>
                                                </>
                                            )}
                                        </div>
                                    </Card.Text>

                                    <Button variant="primary" as={Link} to={`/sale/detail/${item.saleNo}`}>
                                        상세보기
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    )
                })}
            </Col>
        </Row>
    </>)
}


//내부적으로만 사용하는 하위 컴포넌트
function ItemCard() {

    return (<>

    </>)
}