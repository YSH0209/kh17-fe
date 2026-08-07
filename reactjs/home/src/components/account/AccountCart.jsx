import Jumbotron from "@templates/Jumbotron";
import { apiClient } from "@utils/reaxios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Form, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import NoImage from "@assets/images/no-image.png";
import { FaArrowTrendDown } from "react-icons/fa6";

export default function AccountCart() {

    //시작하자마자 요청을 보내 받아온 장바구니 목록을 표시
    const [cartList, setCartList] = useState([]);

    useEffect(()=>{
        loadData();
    }, []);

    const loadData = useCallback(async ()=>{
        const { data } = await apiClient.get("/cart/");
        // setCartList(data.cartItems); //체크 미설정
        setCartList(data.cartItems.map(
            item=>({...item, choice : true})
        ));
        //console.log(data.cartItems);
    }, []);

    //할인율 계산 함수
    const calculateDiscountRate = useCallback((item)=>{
        if(item.origin <= item.discount) return 0;
        if(item.discount === 0) return 100;
        const discount = item.origin - item.discount;
        const rate = discount * 100 / item.origin;
        return rate.toFixed(0);//소수점 2자리
    }, []);

    // 수량 변경 함수 (수량이 변경되면 서버에 바로 반영할것인지 결정)
    const changeItemQty = useCallback((e, target)=>{
        const { value } = e.target;
        const replacement = value.replace(/[^0-9]+/g, "");
        const number = parseInt(replacement) || 1;

        setCartList(
            prev=>prev.map(
                item => {
                    if(item.no === target.no) {//찾는 상품이면
                        //number가 qty에 적용된 객체 반환
                        return { ...item , qty : number };
                    }
                    return { ... item };//나머지는 그대로 반환
                }
            )
        );
    }, []);

    //항목 체크
    const changeItemSelected = useCallback((e, target)=>{
        const { checked } = e.target;

        setCartList(
            prev=>prev.map(
                item => {
                    if(item.no === target.no) {//찾는 상품이면
                        return { ...item , choice : checked };
                    }
                    return { ... item };//나머지는 그대로 반환
                }
            )
        );
    }, []);

    //전체 선택 관련
    const checkedAll = useMemo(()=>{
        // let all = true;
        // for(let i=0; i < cartList.length; i++) {
        //     all = all && cartList[i].choice;
        // }
        // return all;

        //return cartList.reduce(계산함수, 초기값);
        return cartList.reduce((acc, cur) => acc && cur.choice ===true , true );
    }, [cartList]);

    const toggleAll = useCallback(e=>{
        const { checked } = e.target;
        setCartList(prev=>prev.map(
            item=>({ ...item, choice : checked })
        ))
    }, []);

    //[1] 체크된 상품의 총 계산금액을 구하여 하단에 출력
    const totalAmount = useMemo(()=>{
       return cartList.reduce((acc,cur)=>{
            if(cur.choice === true){ //체크되어있다면
                return acc + cur.discount * cur.qty; //할인가를 합산
            }
            return acc; //아니면 그대로 반환
       },0);
    }, [cartList]);

    //[2] 체크된 상품의 할인전/후 금액을 각각 구하여 하단에 출력 (=gmarket)

    

    return (<>
        <Jumbotron title="장바구니" content="상품 수량을 확인하고 구매를 진행해주세요" />

        {/* 구매할 상품의 정보와 수량을 출력 */}
        <Row className="mt-5">
            <Col>
                <div className="mb-2">
                    <Form.Check type="checkbox" label="전체 선택" 
                        checked={checkedAll}
                        onChange={toggleAll}/>
                </div>
                <ListGroup>
                    {cartList.map(item=>(
                    <ListGroupItem key={item.no}>
                        <div className="d-flex align-items-center">
                            <Form.Check type="checkbox" className="me-2"
                                checked={item.choice === true}
                                onChange={e=>changeItemSelected(e, item)}/>

                            <img src={
                                item.thumbnail ?
                                `${import.meta.env.VITE_SERVER_URL}/api/attach/${item.thumbnail}`
                                    : NoImage
                            } width={100}/>

                            <div className="ms-4 flex-grow-1">
                                <h4 className="fw-bold text-info">
                                    {item.name}
                                </h4>
                                <div className="text-start">
                                    {item.origin > item.discount ? (<>
                                    <s className="text-muted">
                                        {item.origin.toLocaleString()} 원
                                    </s>
                                    <br/>
                                    <b className="text-danger">
                                        {item.discount.toLocaleString()} 원
                                    </b>
                                    <br/>
                                    <span className="text-success">
                                        <FaArrowTrendDown style={{transform:"rotate(55deg)"}}/> 
                                        {calculateDiscountRate(item)}%
                                    </span>
                                    </>) : (<>
                                    <b>{item.origin.toLocaleString()} 원</b>
                                    </>) }
                                </div>
                                <div className="text-end">
                                    <span>수량 : </span>
                                    <Form.Control type="number" inputMode="numeric"
                                        value={item.qty} min={1} 
                                        onChange={e=>changeItemQty(e, item)}
                                        className="d-inline-block mx-2"
                                        style={{width:75}}
                                        />
                                    <span>개</span>
                                </div>
                            </div>
                        </div>
                    </ListGroupItem>
                    ))}
                </ListGroup>
            </Col>
        </Row>

        <Row className= "mt-5">
            <Col className="text-end fs-2 fw-bold text-info">
                총 {totalAmount.toLocaleString()}원
            </Col>
        </Row>

    </>)
}