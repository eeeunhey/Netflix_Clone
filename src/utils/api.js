import axios from "axios"
import.meta.env.VITE_KEY

const API_KEY = import.meta.env.VITE_API_KEY;
// axios ('https// ') 치기 귀찮 앞 주소를 기본값으로 지정하자

//utils 웹페이지 도구같은 함수들을 넣어놓기 좋다
// 인스턴스를 클릭하면 설정값으로 인스턴스를 생성할 수 있다

const api = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    headers:{
        Accept:'application/json',
        Authorization:`Bearer ${API_KEY}`
    }
});

// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
  }, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  });

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  }, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  });

export default api; 