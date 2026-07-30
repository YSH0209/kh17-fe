import Jumbotron from "@templates/Jumbotron";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Row, Col, Card, Badge, Form, Button } from "react-bootstrap";
import { apiClient } from "@utils/reaxios";
import { useParams } from "react-router-dom";

import NoImage from "@assets/images/no-image.png";
import { purifyHtml } from "@utils/purify";

export default function SaleDetail() {

    const { saleNo } = useParams();

    //state
    const [sale, setSale] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [detailImages, setDetailImages] = useState([]);

    const loadData = useCallback(async () => {
        const { data } = await apiClient.get(`/sale/${saleNo}`);
        const { saleDto, thumbnail, details } = data;
        setSale(saleDto);
        setThumbnail(thumbnail);
        setDetailImages(details);
    }, []);
    useEffect(() => {
        loadData();
    }, []);


    //썸네일 주소 계산 memo
    const thumbnailUrl = useMemo(() => {
        if (thumbnail === null) return NoImage;
        return `${import.meta.env.VITE_SERVER_URL}/api/attach/${thumbnail.attachNo}`;
    }, [thumbnail]);

    //sale은 절대로 null이면 안된다
    //sale이 null이면 기다려야함
    if (sale === null) {
        return <h1>로딩중</h1>
    }
    return (<>
        <Jumbotron title="상품 상세 정보" />

        <Row className="mt-5">
            {/* 썸네일 영역 */}
            <Col sm={6}>
                <img src={thumbnailUrl} width={"100%"} />
            </Col>
            {/* 상품정보 영역 */}
            <Col sm={6}>
                <h3>{sale.saleName}</h3>
                <div>
                    <Badge bg="info">{sale.saleCategory}</Badge>
                </div>
                {/*  할인이 없는경우 */}
                {sale.saleOriginalPrice === sale.saleDiscountPrice && (<>
                    <div>
                        <s className="text-info">{sale.saleOriginalPrice.toLocaleString()}원</s>
                    </div>
                </>)}
                {/* 할인이 있는경우 */}
                {sale.saleOriginalPrice > sale.saleDiscountPrice && (<>
                    <div>
                        <s className="text-mutes">{sale.saleOriginalPrice.toLocaleString()}원</s>
                        <b className="text-danger ms-2">00%</b>
                        <br />
                        <b className="text-danger fs-4">
                            {sale.saleDiscountPrice.toLocaleString()}원
                        </b>
                    </div>
                </>)}

                {/* 재고 표시 */}
                <div className="mt-5">
                    현재 <b>{sale.saleStock.toLocaleString()}</b>개 남음
                </div>

                {/* 구매수량 선택 및 구매 or 장바구니 버튼*/}
                <div className="mt-3 d-flex">
                    <Form.Control type="number" className="d-inline-block"
                        style={{ width: 80 }} value={1} />
                    <Button variant="primary" className="ms-2">구매</Button>
                    <Button variant="success" className="ms-2">장바구니</Button>
                </div>
            </Col>
        </Row>

        {/* 상세 이미지들 출력 */}
        {detailImages.length > 0 && (

            <Row className="mt-5">
                <Col>
                    {detailImages.map(detail => {
                        const url = `${import.meta.env.VITE_SERVER_URL}/api/attach/${detail.attachNo}`;
                        return (
                            <img key={detail.attachNo} src={url} width={"100%"} />
                        )
                    })}
                </Col>
            </Row>
        )}

        {/* 추가 상세 정보 출력 */}
        <Row className="mt-5">
            <Col>
                <div dangerouslySetInnerHTML={
                    {__html:purifyHtml(sale.saleContent)}
                }></div>            
            </Col>
        </Row>

        {/* 
            관리자만 볼 수 있는 삭제버튼을 만들고 경고창 출력 후 
            확인을 누르면 서버로 신호를 보내 삭제
            그 후 목록으로 이동
            서버주소 : /api/sale/{saleNo} [DELETE]
        */}
    </>)
}