import { useMemo } from "react";

export default function Home() {
    const canHover = useMemo(()=>{
        return window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches;
    }, []);

    return (<>
        <h1>메인페이지</h1>
        <p>
            {canHover && "당신은 마우스 사용이 가능한 환경인거 같아요" }
            {!canHover && "당신은 마우스 사용이 불가능한 환경인거 같아요"}
        </p>
    </>)
}