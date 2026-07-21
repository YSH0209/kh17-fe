//Axios를 백엔드 인증 구조에 맞게 분할 및 개조하여 사용할 수 있도록 처리하여 제공하는 파일
import axios from "axios";

//기본 정보 설정
const baseURL = import.meta.env.VITE_SERVER_URL; //기본 주소

//상황별로 쓰일 Axios 객체를 생성하여 내보내기
//[1] 인증용 Axios
export const authClient = axios.create({
    baseURL : `${baseURL}/service/auth`,
    timeout : 3000,
    withCredentials : true
});

//[2] 인증 메일용 Axios 객체
export const certClient = axios.create({
     baseURL : `${baseURL}/service/cert`,
    timeout : 10000,
    withCredentials : false
});

//[3] API 요청용 Axios 객체
export const apiClient = axios.create({
     baseURL : `${baseURL}/api`,
    timeout : 5000,
    withCredentials : true
});


//(추가) [3]번 API 요청용 Axios객체의 요청이 실패한 상황 중 응답 코드가 401번인 경우 갱신 요청
//- axios에는 interceptor 라는 기능이 존재
//- axios 공식사이트에서 제공하는 interceptor 구문을 가져다가 수정

// Add a request interceptor
apiClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
apiClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
