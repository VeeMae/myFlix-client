import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'

import './main-view.scss';
import { Nav } from 'react-bootstrap';

//Declares the component by extending the React.Component class to inherit all of its lifecyley methods
export class MainView extends React.Component {
    constructor() {
    // Call the superclass constructor
    // so React can initialize it
        super();

    // Initialize the state to an empty object so we can destructure it later
        this.state = {
            movies: null,
            selectedMovie: null,
            user: null
    };
}

  // One of the "hooks" available in a React Component
  componentDidMount() {
    axios.get('https://myflix-movie-application.herokuapp.com/movies')
      .then(response => {
        // Assign the result to the state
          this.setState({
            //Data from the response/API
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        })
    }

  render() {
    // If the state isn't initialized, this will throw on runtime
    // before the data is initially loaded
    const { movies, selectedMovie, user } = this.state;

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

      return (
          <Container>

            <Container>

                <Navbar variant='dark' expand='lg'>

                      <Navbar.Brand href='#'>myFlix</Navbar.Brand>
                      <Navbar.Toggle aria-controls='basic-navbar-nav' />

                      <Navbar.Collapse id='basic-navbar-nav'>

                        <Nav>
                            <Nav.Link href='#'>Profile</Nav.Link>
                            <Nav.Link href='#'>Logout</Nav.Link>
                        </Nav>

                      </Navbar.Collapse>

                </Navbar>

            </Container>

            <h1 className='container-header'>Browse Movies</h1>
                <div className="main-view row">
                    {selectedMovie
                        ? <MovieView movie={selectedMovie} goBack={() => this.onMovieClick(null)}/>
                        : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)} />
                    ))}
                </div>
        </Container>
    );
  }
}
