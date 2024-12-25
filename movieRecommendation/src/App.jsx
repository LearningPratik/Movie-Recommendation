import React, { useEffect, useState } from 'react';
import Image from "./movies.jpg";
import useMovielist from './hooks/useMovieslist';
import axios from 'axios';

function MovieRecommendationForm() {

  const initialState = "";
  
  const [movieData, setMovieData] = useState("");
  const [onChangeName, setOnChangeName] = useState( [] );
  const [recommendations, setRecommendations] = useState( '' );
  const [posters, setPosters] = useState("");

  useEffect( () => {

    const url = 'http://127.0.0.1:8000/movies'
    axios.get(url).then( (response) => {
      setMovieData(response.data);
    });
  }, [])



  const movieOptions = Object.values(movieData)
  const movieRecommendations = Object.values(recommendations)

  const handleChange = (event) => {
    // ... handle the event
    setOnChangeName(event.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = 'http://localhost:8000/recommend'
    
    const response = axios.post(url, { 'movie': onChangeName }, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then( (response) => setRecommendations(response.data))
  }

  return ( 
  <>
  <div className = 'flex items-center justify-between px-10'>
    <div className = 'w-full max-w-md mx-auto shadow-md rounded-3xl px-6 py-4 my-40 text-orange-500 bg-gray-800'>
      <label>Search movies : </label>
      <select
          className="outline-none w-full py-2 px-3 my-4"
          value = { onChangeName }
          onChange = { handleChange }>
          
          { movieOptions.map( (movie, index) => (
          <option key = { index }> {movie}   
            </option>
          ))}

      </select>
      <form onSubmit = { handleSubmit }>
        <button type = "text" 
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium bg-white rounded-full border border-gray-200">
                Recommend
        </button>
      </form>
    </div>

    <div className = 'grid grid-cols-5 gap-4 m-6 px-6 py-6 text-center text-orange-500 rounded-3xl bg-gray-800'>
      {
        movieRecommendations.map((movie) => (
          <>
            <img
              src = { movie[0] } 
              alt = {`${movie[0]}`}
            />
            <img
              src={movie[1] } 
              alt = {`${movie[1]}`}
            />

            <img
              src={movie[2]} 
              alt = {`${movie[2]}`}
            />

            <img
              src={movie[3]} 
              alt = {`${movie[3]}`}
              />

            <img
              src={movie[4]} 
              alt = {`${movie[4]}`}
              />

          </>
        ))
      }

    </div>
    </div>
    <footer className = 'text-center text-3xl text-pretty text-orange-500'> 
      <p>Movie Recommendation web app, I used Machine learning for recommendations, FastAPI for backend and React for frontend</p> 
    </footer>
    </>
  )
}

export default MovieRecommendationForm;