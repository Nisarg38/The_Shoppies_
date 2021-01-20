import './App.css';
import React, { useReducer, useEffect } from "react";
import Topnavbar from './components/Topnavbar' ; 
import ColoredLine from './components/breakline';
import Search from './components/Search';
import Movie from './components/Movie';
import axios from "axios";
import { initialState, reducer } from "./components/reducer";
import spinner from "./assests/ajax-loader.gif";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b";

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`).then(
      jsonResponse => {
        if (jsonResponse.data.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: jsonResponse.data.Search
          });
        } else {
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.data.Error
          });
        }
      }
    );
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div>
      <div classname = 'navbar'>
        <Topnavbar text="THE SHOPPIES" />
        <Search search= {search} />
        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
}

export default App;
