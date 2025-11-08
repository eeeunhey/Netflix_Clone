import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

//api 문서 popularMovies 정보를 가져올 수 있는 주소를 get 에 넣어준다
// 주소에 관한 정보들을 반환
// hook을 만드는 이유는 다른곳에서도 사용
// 우리가 비즈니스 부분과 ui를 분리하는 목적으로 

const fetchPopularMovies = () => {
  return api.get(`/movie/popular`);
};

export const usePopularMoivesQuery = () => {
  return useQuery({
    queryKey: ["moive-popular"],
    queryFn: fetchPopularMovies,
    select:(result)=>result.data
  });
};
