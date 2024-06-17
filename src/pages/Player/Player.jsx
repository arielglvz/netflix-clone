import React, { useEffect, useState } from 'react';
import './Player.css';

// ----- Libraries
import { useNavigate, useParams } from 'react-router-dom';

// ----- Assets
import back_arrow_icon from '../../assets/back_arrow_icon.png'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTViMjRmOTM5YWFlNjhiZWE2YmEwNmVlMmRjZTJhZiIsInN1YiI6IjY2NmVmZjI5NGRjYjIzZTYyOTNlNWFmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hFoKsH3Sr6zNhJurMUfI5w9Mw4zEl_J7ngua6thkUC0'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
  }, [])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back arrow icon" onClick={()=>{navigate(-1)}}/>
      <iframe width='90%' height='90%'
      src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' 
      frameBorder='0' 
      allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player