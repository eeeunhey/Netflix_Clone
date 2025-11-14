import React from 'react'
import { useParams } from 'react-router-dom';
import { useMovieDetail } from '../../hooks/useMovieDetail';


//1. 카드를 클릭하면 영화 상세페이지로 넘어간다.

//홈페이지에서 영화 카드를 클릭하면 영화 상세페이지로 넘어갈 수 있게 스스로 코드를 짜보자 

// 힌트 : useNavigate를 사용하자


const MovieDetailPage = () => {
  const { id } = useParams(); 
  const {data, isLoading, isError, error} = useMovieDetail(id);

  console.log("디테일임:", data);

  return (
    <div style={{ paddingTop: "80px" }}
    >
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{data. overview}</p>
    </div>
  )
}

export default MovieDetailPage