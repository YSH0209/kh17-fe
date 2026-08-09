import Jumbotron from "@templates/Jumbotron";
import { apiClient } from "@utils/reaxios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaAsterisk, FaPlus } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router-dom";

export default function BookAdd() {
    //state
    const [book, setBook] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPublicationDate: "",
        bookPrice: "",
        bookPageCount: "",
        bookGenre: ""
    });

    const [result, setResult] = useState({
        bookTitle: "",
        bookAuthor: "",
        bookPublisher: "",
        bookPublicationDate: "",
        bookPrice: "",
        bookPageCount: "",
        bookGenre: ""
    });

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    //memo
    const valid = useMemo(() => {
        if (result.bookTitle !== "is-valid") return false;
        if (result.bookAuthor !== "is-valid") return false;
        if (result.bookPublisher !== "is-valid") return false;
        if (result.bookPublicationDate !== "is-valid") return false;
        if (result.bookPrice !== "is-valid") return false;
        if (result.bookPageCount !== "is-valid") return false;
        if (result.bookGenre !== "is-valid") return false;
    }, [result]);

    //callback
    const changeStringValue = useCallback(e => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        });
    }, [book]);

    const changeNumericValue = useCallback((e) => {
        const { name, value } = e.target;
        const regex = /[^0-9]/g;
        const replacement = value.replace(regex, "");
        const result = parseInt(replacement);
        setBook({
            ...book,
            [name]: result
        });
    }, [book]);

    //검사 후 결과 갱신 함수
    const checkBookTitle = useCallback(() => {
        const valid = book.bookTitle.length > 0;
        setResult({
            ...result,
            bookTitle: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookTitle, result]);

    const checkBookAuthor = useCallback(() => {
        const regex = /^[^!@#$]+$/;
        const valid = book.bookAuthor.lenght == 0 || regex.test(book.bookAuthor);
        setResult({
            ...result,
            bookAuthor: "is-valid"
        });
    }, [book.bookAuthor, result]);

    const checkBookPublisher = useCallback(() => {
        const valid = book.bookPublisher.length > 0;
        setResult({
            ...result,
            bookPublisher: valid ? "is-valid" : "is-invalid"
        })
    }, [book.bookPublisher, result]);

    const checkBookPublicationDate = useCallback(() => {
        const regex = /^([0-9]{4})-(((02)-(0[1-9]|1[0-9]|2[0-9]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01])))$/;
        const valid = regex.test(book.bookPublicationDate);
        setResult({
            ...result,
            bookPublicationDate: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPublicationDate, result]);

    const checkBookPrice = useCallback(() => {
        const valid = parseInt(book.bookPrice) <= 100000000;
        setResult({
            ...result,
            bookPrice: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPrice, result]);

    const checkBookPageCount = useCallback(() => {
        const valid = parseInt(book.bookPageCount) > 0;
        setResult({
            ...result,
            bookPageCount: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookPageCount, result]);

    const checkBookGenre = useCallback(() => {
        const regex = /^(판타지|교양|소설|역사|과학|추리소설|자기계발|수험서)$/;
        const valid = regex.test(book.bookGenre);
        setResult({
            ...result,
            bookGenre: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookGenre, result]);

    //등록을 위한 데이터 전송
    const send = useCallback(async () => {
        const response = await apiClient.post("/api/book/", book);
        toast.success("도서 등록 완료");
        navigate("/book/list");
    }, [book]);


    return (<>
        <Jumbotron title="도서등록" />
        <Row className="mt-4">
            <Form.Label column sm={3}>
                <span>도서명</span>
                <FaAsterisk className="text-danger" />
            </Form.Label>
            <Col sm={9}>
                <Form.Control type="text" name="bookTitle" value={book.bookTitle}
                    onChange={changeStringValue}
                    onBlur={checkBookTitle}
                    className={result.bookTitle} />
                <div className="valid-feedback">도서명이 설정되었습니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>
                <span>작가</span>
                <FaAsterisk className="text-danger" />
            </Col>
            <Col sm={9}>
                <Form.Control type="text" name="bookAuthor" value={book.bookAuthor}
                    onChange={changeStringValue}
                    onBlur={checkBookAuthor}
                    className={result.bookAuthor} />
                <div className="valid-feedback">작가 설정되었습니다</div>
                <div className="invalid-feedback">특수문자는 사용할 수 없습니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>
                <span>출판일</span>
                <FaAsterisk className="text-danger" />
            </Col>
            <Col sm={9}>
                <Form.Control type="date" name="bookPublicationDate" value={book.bookPublicationDate}
                    onChange={changeStringValue}
                    onBlur={checkBookPublicationDate}
                    className={result.bookPublicationDate} />
                <div className="valid-feedback">출판일 설정되었습니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>
                <span>가격</span>
                <FaAsterisk className="text-danger" />
            </Col>
            <Col sm={9}>
                <Form.Control type="text" name="bookPrice" value={book.bookPrice}
                    onChange={changeNumericValue}
                    onBlur={checkBookPrice}
                    className={result.bookPrice} />
                <div className="valid-feedback">가격 설정되었습니다</div>
                <div className="invalid-feedback">0 이상의 숫자만 가능합니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>
                <span>출판사</span>
            </Col>
            <Col sm={9}>
                <Form.Control type="text" name="bookPublisher" value={book.bookPublisher}
                    onChange={changeStringValue}
                    onBlur={checkBookPublisher}
                    className={result.bookPublisher} />
                <div className="valid-feedback">출판사 설정되었습니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>
                <span>페이지 수</span>
            </Col>
            <Col sm={9}>
                <Form.Control type="text" name="bookPageCount" value={book.bookPageCount}
                    onChange={changeNumericValue}
                    onBlur={checkBookPageCount}
                    className={result.bookPageCount} />
                <div className="valid-feedback">페이지 수 설정되었습니다</div>
                <div className="invalid-feedback">0이상의 페이지만 설정 가능합니다</div>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col sm={3}>
                <span>장르</span>
                <FaAsterisk className="text-danger" />
            </Col>
            <Col sm={9}>
                <Form.Select name="bookGenre" value={book.bookGenre}
                    onChange={changeStringValue}
                    onBlur={checkBookGenre}
                    className={result.bookGenre}>
                    <option value="">선택하세요</option>
                    <option>판타지</option>
                    <option>교양</option>
                    <option>소설</option>
                    <option>역사</option>
                    <option>과학</option>
                    <option>추리소설</option>
                    <option>자기계발</option>
                    <option>수험서</option>
                </Form.Select>
                <div className="valid-feedback">장르 설정되었습니다</div>
            </Col>
        </Row>


        <Row className="mt-5">
            <Col>
                <Button type="button" variant="success" className="w-100"
                    disabled={valid === false} onClick={send}>
                    <FaPlus className="me-2" />
                    <span>등록하기</span>
                </Button>
            </Col>
        </Row>


    </>)
}