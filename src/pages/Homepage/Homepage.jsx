import React from 'react'
import Banner from './components/Banner/Banner'
import MovieSlide from './components/MovieSlide/MovieSlide'

// 1. 배너 만들기 => popoular 영화를 들고와서 첫번쨰 아이템을 보여주자
// 1-1 배너 컴포넌트 만들어보기
// 각각의 페이지 안에 컴포넌트 폴더를 넣어준다

// 11월 9일 영화 슬라이드 만들기
//1. npm install react-multi-carousel --save 설치함 
//2. 컴포넌트 만듬
// 2. popular movie 
// 3. top rated movie
// 4. upcoming movie 
const Homepage = () => {
  return (
    <div>

    <Banner />
    <MovieSlide />
    

    </div>
  )
}

export default Homepage