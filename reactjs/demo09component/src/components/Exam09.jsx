import { useEffect, useState } from "react";
import Jumbotron from "./Jumbotron";
import axios from "axios";

function Exam09() {
    //state
    const [bookList, setBookList] = useState([]);
    //effect
    useEffect(()=>{
        axios({
            url:"http://localhost:8080/api/book/list",
            method:"get"
        })
        .then(response=>{
            setBookList(response.data);
        });
    }, []);

    return (<>
        <Jumbotron title="도서 목록 구현"/>

        <div className="row mt-4">
            <div className="col">
                <ul className="list-group">
                    {bookList.map(book=>(
                    <li className="list-group-item" key={book.bookId}>
                        <p className="text-muted">
                            <span>{book.bookGenre}</span>
                        </p>

                        <h3>{book.bookTitle}</h3>

                        {/* ??는 앞 항목이 null, undefined 등 확실하게 없는 경우 다음을 실행 */}
                        {/* ||는 앞 항목이 null, undefined, false, 0, "" 등 부정적인 경우 다음을 실행 */}

                        {/* <div>지은이 : {book.bookAuthor === null ? "없음" : book.bookAuthor}</div> */}
                        <div>지은이 : {book.bookAuthor ?? "없음"}</div>
                        <div>출판사 : {book.bookPublisher ?? "없음"}</div>

                        <div className="my-4">
                            책에 대한 설명 어쩌구저쩌구...
                        </div>

                        <div className="my-2">
                            {book.bookPrice.toLocaleString()}원
                        </div>
                        <div className="my-2">
                            {book.bookPageCount.toLocaleString()}p
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    </>)
}

export default Exam09;