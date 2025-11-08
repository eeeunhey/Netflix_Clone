import axios from "axios"
import.meta.env.VITE_KEY

const API_KEY = import.meta.env.VITE_API_KEY;
console.log("api key",API_KEY ? "잘됨":"안됨:",API_KEY);
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
console.log("Axios",api.defaults);

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
    return response;
  }, function (error) {

    return Promise.reject(error);
  });

export default api; 