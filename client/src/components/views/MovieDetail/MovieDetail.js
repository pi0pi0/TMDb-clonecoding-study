import React, {useEffect, useState} from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'; 
import MainImage from '../commons/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {
     //console.log(props.match);
     let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
   
    useEffect(() => {
 
        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
           // console.log('movie crew' ,response)
            setCasts(response.cast);
        })
    }, [])
    
    
    const toggleActorView = () => {
        setActorToggle( !ActorToggle )
    } 

    return (
        <div>
            {/* header */}
            <MainImage
                 image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                 title={Movie.original_title}
                 text={Movie.overview}
                        
            />
             {/* body */}
             <div style={{width: '85%', margin: '1rem auto'}}>
                {/* Favorite Button : userFrom 의경우 페이지 로그인시에 local storage에 저장된 userId 값을 가져온다 */}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}    />
                </div>


                 {/* Movie Info */}
                    <MovieInfo
                        movie={Movie}
                    />
                 <br/>

                {/* Actors Grid */} 
                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={toggleActorView}> Toggle Actor View</button>

                </div>


                {ActorToggle && 
                    <Row gutter={[16,16]}>
                        {Casts && Casts.map((cast, index)=>(
                            <React.Fragment key={index}>  
                                <GridCards 
                                    image={cast.profile_path ? 
                                    `${IMAGE_BASE_URL}w500${cast.profile_path}` : null
                                    } 
                                    castName={cast.name}
                                />

                            </React.Fragment>

                        ))}
                     </Row>
                }

             </div>
        </div>
    )
}

export default MovieDetail