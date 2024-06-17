import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { NavLink } from 'react-router-dom';
// import card_data from '../../assets/cards/Cards_data'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTViMjRmOTM5YWFlNjhiZWE2YmEwNmVlMmRjZTJhZiIsInN1YiI6IjY2NmVmZjI5NGRjYjIzZTYyOTNlNWFmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hFoKsH3Sr6zNhJurMUfI5w9Mw4zEl_J7ngua6thkUC0'
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])

  console.log(apiData)
  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => {
          return (
            <NavLink to={`/player/${card.id}`} className="card" key={card.id}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt={card.title} />
              <p>{card.original_title}</p>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default TitleCards