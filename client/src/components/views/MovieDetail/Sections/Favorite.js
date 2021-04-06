import React, { useEffect } from 'react'
import Axios from 'axios'
import { response } from 'express'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    //이 영화에 좋아요 누른 개수 가져오기. movieId는 Movie state에 들어있다. 
    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }

        //서버요청 movieId, userFrom 필요
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            if(response.data.success){

            }else{
                alert('숫자정보를 가져오는데 실패했습니다.')
            }
        })
 
    },[] )


    return (
        <div>
          <button>Favorite</button>  
        </div>
    )
}

export default Favorite
