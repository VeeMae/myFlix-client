import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';


export class MovieView extends React.Component {
    constructor() {
        super()

        this.state = {};
    }

    addFaveMovie(movie) {

        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios({
            method: 'post',
            url: `https://myflix-movie-application.herokuapp.com/users/${userName}/movies/${movie._id}`,
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => {
            alert('You have added this movie to your list of Favorites.');
        });
  }

    render() {
        const { movie } = this.props;

        if (!movie) return null;

        return (
            <Container className="movie-view">
                <Row className='movie-row'>
                    <Col className='movie-view_col'>

                        <Card className='detail-view'>
                            <Card.Img variant='top' src={movie.ImagePath} />
                        </Card>

                        <div className="movie-title">
                            <span className="label">Title: </span>
                            <span className="value">{movie.Title}</span>
                        </div>
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>

                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.Genre.Name}</span>
                        </div>
                        <div className="movie-director">
                            <span className="label">Director: </span>
                            <span className="value">{movie.Director.Name}</span>
                        </div>

                        <Link to={`/movies/director/${movie.Director.Name}`}>
                            <Button className='card-button' variant="link">Director</Button>
                        </Link>

                        <Link to={`/movies/genre/${movie.Genre.Name}`}>
                            <Button className='card-button' variant="link">Genre</Button>
                        </Link>


                        <Link to='/'>
                            <Button className='return-button'>Return</Button>
                        </Link>

                        <Button onClick={() => this.addFaveMovie(movie)}>Add to Favorite Movies</Button>

                    </Col>
                </Row>
            </Container>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    })
};