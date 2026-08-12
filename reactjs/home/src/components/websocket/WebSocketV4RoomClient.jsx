import Jumbotron from "@templates/Jumbotron";
import { useParams } from "react-router-dom";
import { apiClient } from "@utils/reaxios";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function WebSocketV4RoomClient() {
    //방번호 읽기
    const { roomNo } = useParams();

    //navigate
   const navigate = useNavigate();
    
    //방정보 불러오기
    const [room, setRoom] = useState(null);
    const loadRoom = useCallback(async () => {
        try {
            const { data } = await apiClient.get(`/room/${roomNo}`);
            setRoom(data.room);
        }
        catch (e) {
            if (e.status === 403) {
                await Swal.fire("해당 방의 참여자가 아닙니다");
                navigate("/websocket/v4"); //목록으로 이동
            }
            else if (e.status === 404) {
                await Swal.fire("해당 방이 존재하지 않습니다");
                navigate("/websocket/v4"); //목록으로 이동
            }
            else {//500
                await Swal.fire("일시적인 서버 오류입니다.\n잠시 후 실행해주세요");
                navigate("/websocket/v4"); //목록으로 이동
            }
        }
    }, []);
    useEffect(() => {
        loadRoom();
    }, []);

    if(room === null){
        return (<>로딩중</>);
    }


    return (<>
        <Jumbotron title="그룹채팅예제" content={`현재 입장하신 방은 ${roomNo} 번방 입니다`} />

        {/* 방 정보 출력 */}
        <Row className="mt-5">
            <Col sm={3} className="text-info fw-bold">방 제목</Col>
            <Col sm={9}>{room.roomName}</Col>
        </Row>
        <Row className="mt-5">
            <Col sm={3} className="text-info fw-bold">방장</Col>
            <Col sm={9}>{room.owner ?? "없음"}</Col>
        </Row>
        <Row className="mt-5">
            <Col sm={3} className="text-info fw-bold">참여자 수</Col>
            <Col sm={9}>? / {room.roomLimit ?? "제한없음"} 명</Col>
        </Row>
    </>)
}



