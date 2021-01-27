
import './App.css';
import { Nav, Navbar, Form, FormControl, Button, Image , NavDropdown, Card, CardColumns} from 'react-bootstrap';
import React, { useReducer, useEffect } from "react";
import Search from './components/Search';
import Movie from './components/Movie';
import axios from "axios";
import { initialState, reducer } from "./components/reducer";
import spinner from "./assests/loader.gif";

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
      <div className="spinner">
      <img src={spinner} alt="Loading spinner" />
      </div>
    ) : errorMessage ? (
      <div className="spinner">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );


  return (
    <div style={{ 
      backgroundImage: `url("https://via.placeholder.com/500")` 
    }} className="header">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" Rounded className="logo">
    <img src="https://media.giphy.com/media/U6eaFPHjUomDS7dkAU/giphy.gif" height="80px" width="80px" />
  <Navbar.Brand href="#home" className="shoppies">SHOPPIES</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="https://www.shopify.com/">Shopify</Nav.Link>
      <Nav.Link href="https://github.com/Nisarg38">GitHub</Nav.Link>
      <Nav.Link href="https://www.linkedin.com/in/nisarg-patel-1256b816b/">LinkedIn</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    <div className="body" style={{ 
      backgroundImage: `url("")` 
    }} >

      
        <Search search= {search} />
        <div className="cardsrch">

<CardColumns>
        
        <Card style={{width: '85rem', marginLeft: "5rem"}}>
  <div class="card-body">
  <h3>Movies</h3>
    <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
              <Nav.Link href="#first">Popular</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="#rated">Top Rated</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="#Action">Action</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link href="#Horror">Horror</Nav.Link>
              </Nav.Item>
              </Nav>
      </Card.Header>
      <Card.Body>
      <div className="movies">{retrievedMovies}</div>
      </Card.Body>
  </div>
 </Card>

<Card class="card" style={{width: '30rem',marginLeft:"3rem"}}>
  
  <div class="card-body">
  <h3>Nominie list</h3>
  </div>
 
  </Card>

  </CardColumns>

  </div>
  </div>
  </div>








       

  );
}

export default App;
