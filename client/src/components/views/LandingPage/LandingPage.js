import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'; 
import MainImage from './Section/MainImage';
function LandingPage() {

    //2. 가져온 movie 정보를 array에 담아 state로 넘김 
    const [Movies, setMovies] = useState([])
    //3. 2의 정보에서 제일 첫번째 영화사진(=제일 인기 있는 영화 이미지)
    const [MainMovieImage, setMainMovieImage] = useState(null)

    //1. movie api를 가져온다.
    useEffect(()=> {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        //config.js의 THEMOVIEORG key request URL 가져오기
         
        fetch(endpoint)
        .then(response => response.json())
        .then(response => {  console.log(response)

            setMovies([response.results])

            // const setMainMovieImage: (value:any) => void
            setMainMovieImage(response.results[0])

        })
       
    }, [])
     

    return (
       <div style={{width: '100%', margin:'0' }}>
             
            {/** Main Image 
             * 영화 이미지를 가져오기 전에 화면 렌더링이 먼저 실행되는 경우 &&코드를 추가한다.
             **/}
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }

           <div style={{width: '85%', margin:'1rem auto' }}>
                <h2> Movie by latest </h2>
           
                <hr/>
                {/** Movie Grid Card */}

           </div>   

           <div style={{width: '100%', margin:'0' }}>
           {/** Main Image */}

           <div style={{display: 'flex', justifyContent:'center'}}>
                <button>Load More</button>

           </div>   
       </div>

       </div>
    )
}

export default LandingPage
