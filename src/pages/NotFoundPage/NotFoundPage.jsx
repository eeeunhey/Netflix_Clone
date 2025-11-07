import React from 'react'
import { useNavigate } from 'react-router-dom'


const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">페이지를 찾을 수 없습니다.</p>
      <button className="notfound-button" onClick={() => navigate("/")}>
        홈으로 이동
      </button>
    </div>
  )
}

export default NotFoundPage