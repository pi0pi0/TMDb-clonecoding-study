import React from 'react'
import {Col} from 'antd';
function GridCards(props) {
    
        if(props.landingPage){
            return (
  
                //cross web 처럼 한 row에 나올 사진 크기 조절
                <Col lg={6} md={8} xs={24} >
                    <div style={{ position: 'relative'}}>
                        <a href={`/movie/${props.movieId}`}>
                            <img style={{ width:'100%', height:'320px'}} src={props.image} alt={props.movieName}/>
                        </a>
                    </div>
                </Col>
            )    
        }else{
            return (
  
                //cross web 처럼 한 row에 나올 사진 크기 조절
                <Col lg={6} md={8} xs={24} >
                    <div style={{ position: 'relative'}}>
                            <img style={{ width:'100%', height:'320px'}} src={props.image} alt={props.castName}/>
                 
                    </div>
                </Col>
            )      

        }
 
}
export default GridCards
