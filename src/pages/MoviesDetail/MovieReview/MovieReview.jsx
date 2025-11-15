import React, { useState } from 'react'
import { useMovieReviews } from '../../../hooks/useMovieReview'

const MovieReview = ({id}) => {
    const {data} = useMovieReviews(id);
  const [openIndex, setOpenIndex] = useState(null);

  if(!data || data.length === 0) {
    return <h2> 리뷰가 없습니다 </h2>
  }

  return (
    <div>
        <h2>
            REVIEWS: {data.length}
        </h2>

        <ul>
            {data?.map((review, i) => {
                const isOpen = openIndex === i;
                const isLong = review.content.lenght >200;

                return (
                    <li
                    key={i}>
                            <h4>{review.auther}</h4>
                            <p>
                                {review.created_at.slice(0,10)}
                            </p>
                    </li>
    
                )
            })}
        </ul>


    </div>
  )
}

export default MovieReview