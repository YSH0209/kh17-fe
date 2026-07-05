import { useCallback, useMemo, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { FaAsterisk } from "react-icons/fa6";
import { RingLoader } from "react-spinners";


function Exam05() {
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

    const checkbookPublisher = useCallback(() => {
        const valid = book.bookPublisher.length > 0;
        setResult({
            ...result,
            bookPublisher: valid ? "is-valid" : "is-invalid"
        })
    }, [book.bookPublisher, result]);

    const checkbookPublicationDate = useCallback(() => {
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
        // const valid = [판타지, 교양, 소설, 역사, 과학, 추리소설, 자기계발, 수험서].includes(book.bookGenre);
        setResult({
            ...result,
            bookGenre: valid ? "is-valid" : "is-invalid"
        });
    }, [book.bookGenre, result]);

    //등록을 위한 데이터 전송
    const send = useCallback(() => {
        // + 로딩 상태로 변경
        setLoading(true);

        axios({
            url: "http://localhost:8080/api/book/insert",
            method: "post",
            data: book,
        })
            .then(response => {
                Swal.fire({
                    title: "Custom width, padding, color, background.",
                    width: 600,
                    padding: "3em",
                    color: "#716add",
                    background: "#fff url(/images/trees.png)",
                    backdrop: `
                                    rgba(0,0,123,0.4)
                                    url("https://media.tenor.com/rI_0O_9AJ5sAAAAj/nyan-cat-poptart-cat.gif")
                                    left top
                                    no-repeat
                            `
                });


                setBook({
                    bookTitle: "",
                    bookAuthor: "",
                    bookPublisher: "",
                    bookPublicationDate: "",
                    bookPrice: "",
                    bookPageCount: "",
                    bookGenre: ""
                })
                setResult({
                    bookTitle: "",
                    bookAuthor: "",
                    bookPublisher: "",
                    bookPublicationDate: "",
                    bookPrice: "",
                    bookPageCount: "",
                    bookGenre: ""
                })
            })
            .finally(()=>{ //성공|실패 관계없이 무조건 실행
                setLoading(false);
            });
    }, [book]);

    return (
        <>
            <Jumbotron title="신규 도서 등록" />

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">도서명 <FaAsterisk className="text-danger" /></label>
                <input type="text" name="bookTitle" value={book.bookTitle}
                    onChange={changeStringValue}
                    onBlur={checkBookTitle}
                    className={`form-control ${result.bookTitle}`}
                ></input>
                <div className="valid-feedback">도서명 설정이 완료되었습니다</div>
                <div className="invalid-feedback">필수 입력 항목입니다</div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">지은이 <FaAsterisk className="text-danger" /></label>
                <input type="text" name="bookAuthor" value={book.bookAuthor}
                    onChange={changeStringValue}
                    onBlur={checkBookAuthor}
                    className={`form-control ${result.bookAuthor}`}
                ></input>
                <div className="invalid-feedback">특수문자는 사용하실 수 없습니다</div>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">출판사</label>
                <input type="text" name="bookPublisher" value={book.bookPublisher}
                    onChange={changeStringValue}
                    onBlur={checkbookPublisher}
                    className={`form-control ${result.bookPublisher}`}
                ></input>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">출간일</label>
                <input type="date" name="bookPublicationDate" value={book.bookPublicationDate}
                    onChange={changeStringValue}
                    onBlur={checkbookPublicationDate}
                    className={`form-control ${result.bookPublicationDate}`}
                ></input>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">판매가</label>
                <input type="text" name="bookPrice" value={book.bookPrice}
                    onChange={changeNumericValue}
                    onBlur={checkBookPrice}
                    className={`form-control ${result.bookPrice}`}
                ></input>
            </div>
            <div className="valid-feedback">판매가 설정이 완료되었습니다</div>
            <div className="invalid-feedback">0원 이상, 1억원 이하로만 설정 가능합니다</div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">페이지 수</label>
                <input type="text" name="bookPageCount" value={book.bookPageCount}
                    onChange={changeNumericValue}
                    onBlur={checkBookPageCount}
                    className={`form-control ${result.bookPageCount}`}
                ></input>
            </div>

            <div className="row mt-4">
                <label className="col-sm-3 col-form-label">장르 <FaAsterisk className="text-danger" /></label>
                <div className="col-sm-9">
                    <select name="bookGenre" value={book.bookGenre}
                        onChange={changeStringValue}
                        onClick={checkBookGenre}
                        className={`form-select ${result.bookGenre}`}>
                        <option value="">선택하세요</option>
                        <option>판타지</option>
                        <option>교양</option>
                        <option>소설</option>
                        <option>역사</option>
                        <option>과학</option>
                        <option>추리소설</option>
                        <option>자기계발</option>
                        <option>수험서</option>
                    </select>
                    <div className="invalid-feedback">필수 선택 항목입니다</div>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col">
                    <button type="button" className="btn btn-success w-100"
                        disabled={valid === false} onClick={send}>
                        등록하기
                    </button>
                </div>
            </div>

            {/* 로딩 상태 (loading === true) 일 때 보여질 화면 */}
            {/* { loading === true ? <h1>로딩중</h1> : false } */}
            {/* { loading === false && <h1>로딩중</h1> } */}
            {loading === true && (
                <div className="position-fixed top-0 start-0 
                                w-100 h-100 bg-dark bg-opacity-50
                                d-flex justify-content-center align-items-center">
                    <RingLoader size={100} loading={loading}></RingLoader>
                </div>
            )}



        </>
    )

};
export default Exam05;