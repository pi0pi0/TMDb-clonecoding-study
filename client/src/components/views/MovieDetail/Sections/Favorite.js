import React, { useEffect, useState } from 'react'
import Axios from 'axios' 

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    //이 영화에 좋아요 누른 개수 가져오기. movieId는 Movie state에 들어있다. 
    useEffect(() => {
        let variables = {
            userFrom,
            movieId
        }

        //서버요청 movieId, userFrom 필요
        Axios.post('/api/favorite/favoriteNumber', variables)
        .then(response => {
            console.log('favorite number !!');
            console.log(response.data);

            
            if(response.data.success){
                setFavoriteNumber(response.data.favoriteNumber)

                console.log('is this success');
            }else{
                alert('숫자정보를 가져오는데 실패했습니다.')
            }
        })

        // 좋아요 누름여부 
        Axios.post('/api/favorite/favorited', variables)
        .then(response => {
            console.log(' favorited !!! ');
            
           
            console.log(response.data);
            setFavorited(response.data.favorited);
            if(response.data.success){
               
            }else{
                alert('정보를 가져오는데 실패했습니다.')
            }
        })
        
 
    },[] )


    return (
        <div>
          <button>{Favorited? " Not Favorite" : "Add to Favorite "} {FavoriteNumber} </button>  
        </div>
    )
}

export default Favorite
