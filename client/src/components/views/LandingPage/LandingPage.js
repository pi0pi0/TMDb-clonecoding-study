import React, { useEffect, useState } from 'react' 
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'; 
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    // 현재 페이지
    const [CurrentPage, setCurrentPage] = useState(0)
    

    //1. movie api를 가져온다.
    useEffect(()=> {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint)
       
    }, [])
     

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {  
                
                console.log( response.results);
                setMovies([...Movies, ...response.results])

                // const setMainMovieImage: (value:any) => void
                Movies == '' ? setMainMovieImage(response.results[0]) : setMainMovieImage(Movies[0])
               
                // set Current Page
                setCurrentPage(response.page)
        })

    }
    const loadMoreItems = () => {

        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
          
    }

    return (
       <div style={{width: '100%', margin:'0' }}>
             
             
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
                 

                <Row gutter={[16,16]}>
                   
                    {Movies && Movies.map((movie, index)=>(
                        <React.Fragment key={index}>  
                            <GridCards 
                                landingPage
                                image={movie.poster_path ? 
                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null
                                }
                                movieId={movie.id}
                                movieName={movie.original_title}
                            />

                        </React.Fragment>

                        ))
                    }
                </Row>

           </div>   

           <div style={{width: '100%', margin:'0' }}>
                {/** Main Image */}

                <div style={{display: 'flex', justifyContent:'center'}}>
                        <button onClick={loadMoreItems}>Load More</button>

                </div>   
            </div>

       </div>
    )
}

export default LandingPage
