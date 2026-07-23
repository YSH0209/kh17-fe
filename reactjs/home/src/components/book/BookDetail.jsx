import Jumbotron from "@templates/Jumbotron";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { FaCheck, FaList, FaPenToSquare, FaSquarePen, FaTrash, FaXmark } from "react-icons/fa6";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import BookEdit from "./BookEdit";

export default function BookDetail() {
    const { bookId } = useParams();
    if (/^[0-9]+$/.test(bookId) === false) {
        return <Navigate to="/book/list" replace />
    }
    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    useEffect(() => {
        loadData();
    }, []);

    const loadData = useCallback(async () => {
        const response = await apiClient.get(`/api/book/${bookId}`)
        setBook(response.data);
        setBackup(response.data);
    }, []);

    const deleteBook = useCallback(async () => {
        const result = await Swal.fire({
            title: "정말 삭제하시겠습니까?",
            text: "삭제한 데이터는 복구하실 수 없습니다",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "삭제",
            cancelButtonText: "취소",
            confirmButtonColor: "#d63031",
            cancelButtonColor: "#b2bec3"
        });
        if (result.isConfirmed == false) return;
        const response = await apiClient.delete(`/api/book/${bookId}`);
        toast.error("도서 삭제가 완료되었습니다");
        navigate(`/book/list`);
    }, [bookId]);

    const [backup, setBackup] = useState(null);

    const [editMode, setEditMode] = useState({
        bookTitle: false,
        bookAuthor: false,
        bookPublisher: false,
        bookPublicationDate: false,
        bookPrice: false,
        bookPageCount: false,
        bookGenre: false
    });

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

    const updateBook = useCallback(async (field) => {
        const response = await apiClient.patch(
            `/api/book/${bookId}`,
            { [field]: book[field] }
        );

        setBackup({ ...backup, [field]: book[field] });
        setEditMode({ ...editMode, [field]: false });
        toast.success("변경 완료");
    }, [book, backup, editMode]);

    const cancelUpdate = useCallback((field) => {
        setBook({ ...book, [field]: backup[field] })
        setEditMode({ ...editMode, [field]: false })
        toast.error("변경 취소");
    }, [book, backup, editMode]);

    const startUpdate = useCallback((field) => {
        setEditMode({
            ...editMode,
            [field]: true
        })
    }, [editMode]);


    const [show, setShow] = useState(false);
    const closedModal =(()=>{
        setShow(false);
    });



    return (<>
        <Jumbotron title="도서상세" />

        {book === null ? (<>
            {/* 대상 도서가 없을 때 */}
            <h1>로딩중</h1>
        </>) : (<>
            {/* 대상 도서가 있을 때 */}
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    도서명
                </Col>
                <Col sm={9}>
                    {editMode.bookTitle !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookTitle}</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookTitle: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Control type="text" className="w-auto d-inline-block" name="bookTitle" value={book.bookTitle}
                            onChange={changeStringValue} />
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookTitle")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookTitle")} />
                    </>)}
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    작가
                </Col>
                <Col sm={9}>
                    {editMode.bookAuthor !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookAuthor}</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookAuthor: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Control type="text" className="w-auto d-inline-block" name="bookAuthor" value={book.bookAuthor}
                            onChange={changeStringValue} />
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookAuthor")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookAuthor")} />
                    </>)}
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    출간일
                </Col>
                <Col sm={9}>
                    {editMode.bookPublicationDate !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookPublicationDate}</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookPublicationDate: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Control type="text" className="w-auto d-inline-block" name="bookPublicationDate" value={book.bookPublicationDate}
                            onChange={changeStringValue} />
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookPublicationDate")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookPublicationDate")} />
                    </>)}
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    가격
                </Col>
                <Col sm={9}>
                    {editMode.bookPrice !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookPrice.toLocaleString()}원</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookPrice: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Control type="text" className="w-auto d-inline-block" name="bookPrice" value={book.bookPrice}
                            onChange={changeNumericValue} />
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookPrice")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookPrice")} />
                    </>)}
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    출판사
                </Col>
                <Col sm={9}>
                    {editMode.bookPublisher !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookPublisher}</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookPublisher: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Control type="text" className="w-auto d-inline-block" name="bookPublisher" value={book.bookPublisher}
                            onChange={changeStringValue} />
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookPublisher")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookPublisher")} />
                    </>)}
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    페이지 수
                </Col>
                <Col sm={9}>
                    {editMode.bookPageCount !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookPageCount.toLocaleString()}pg</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookPageCount: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Control type="text" className="w-auto d-inline-block" name="bookPageCount" value={book.bookPageCount}
                            onChange={changeNumericValue} />
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookPageCount")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookPageCount")} />
                    </>)}
                </Col>
            </Row>
            <Row className="mt-4 fs-2">
                <Col sm={3} className="text-primary fw-bold">
                    장르
                </Col>
                <Col sm={9}>
                    {editMode.bookGenre !== true ? (<>
                        {/* 수정모드를 안켰을때 */}
                        <span>{book.bookGenre}</span>
                        <FaSquarePen className="text-warning ms-2"
                            onClick={e => {
                                setEditMode(
                                    {
                                        ...editMode,
                                        bookGenre: true
                                    }
                                )
                            }} />
                    </>) : (<>
                        {/* 수정모드를 켰을때 */}
                        <Form.Select className="w-auto d-inline-block" name="bookGenre" value={book.bookGenre}
                            onChange={changeStringValue} >
                            <option>판타지</option>
                            <option>교양</option>
                            <option>소설</option>
                            <option>역사</option>
                            <option>과학</option>
                            <option>추리소설</option>
                            <option>자기계발</option>
                            <option>수험서</option>
                        </Form.Select>
                        <FaCheck className="text-success ms-2" onClick={e => updateBook("bookGenre")} />
                        <FaXmark className="text-danger ms-2" onClick={e => cancelUpdate("bookGenre")} />
                    </>)}
                </Col>
            </Row>

            <hr />

            <Row className="mt-5">
                <Col className="text-end">
                    <Button className="ms-2" variant="warning"
                        as={Link} to={`/book/edit/${bookId}`}>
                        <FaPenToSquare className="me-2" />
                        <span>수정하기</span>
                    </Button>
                    <Button onClick={() => setShow(true)} className="ms-2">수정 모달 띄우기</Button>

                    <Button className="ms-2" variant="danger" onClick={deleteBook}>
                        <FaTrash className="me-2" />
                        <span>삭제하기</span>
                    </Button>
                    <Button className="ms-2" variant="primary"
                        as={Link} to="/book/list">
                        <FaList className="me-2" />
                        <span>목록으로</span>
                    </Button>
                </Col>
            </Row>


            {/* show 속성이 true면 열리고, false면 닫힘 */}
            <Modal show={show} size="lg" onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>수정 창</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <BookEdit/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>취소</Button>
                </Modal.Footer>
            </Modal>



        </>)}







    </>)
}
