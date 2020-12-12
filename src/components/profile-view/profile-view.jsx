import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

import './profile-view.scss';

export class ProfileView extends React.Component {

    constructor() {
        super();

        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            FavoriteMovies: [],
            movies: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken)
    }

    getUser(token) {
        const userName = localStorage.getItem('user')
        axios.get(`https://myflix-movie-application.herokuapp.com/users/${userName}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    FavoriteMovies: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error)
            });
    }

    logOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.open('/', '_self');
    }

    deregisterUser() {

        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios.delete(`https://myflix-movie-application.herokuapp.com/users/${userName}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert('You have been deleted from the registry.')
                this.logOut();
            });
    }

    deleteFaveMovie(movie) {
        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios.delete(`https://myflix-movie-application.herokuapp.com/users/${userName}/movies/${movie._id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                this.componentDidMount();
            });
    }

    render() {

        const { movies } = this.props;
        const userMovies = this.state.FavoriteMovies;
        const FaveMovies = movies.filter(movie => userMovies.includes(movie._id));

        return (

        <Container className="profile-view">
            <Row className='profile-row'>
                <Col className='profile-view_col'>

                    <div className="user-name">
                        <span className="label">Username: </span>
                        <span className="value">{this.state.username}</span>
                    </div>

                    <div className="user-email">
                        <span className="label">Email: </span>
                        <span className="value">{this.state.email}</span>
                    </div>

                    <div className="user-birthday">
                        <span className="label">Birthday: </span>
                        <span className="value">{this.state.birthday}</span>
                    </div>

                    <Link to='/users/:username/update'>
                        <Button className='update-button'>Update Profile</Button>
                    </Link>

                    <Button onClick={() => this.deregisterUser()} className='deleteUser-button'>Delete Profile</Button>


                    <Link to='/'>
                        <Button className='return-button'>Home</Button>
                    </Link>

                </Col>
                </Row>

                <div className='fave-movies_col row'>

                    <h2>Favorite Movies</h2>

                    {FaveMovies.map(movie => {
                        return (

                        <Card key={movie._id} border='dark' className='fave-movies'>

                            <Card.Img variant='top' src={movie.ImagePath} />
                            <Card.Header>
                                <Card.Body>
                                    <Card.Title as='h1'>{movie.Title}</Card.Title>
                                </Card.Body>
                            </Card.Header>

                            <Link to={`/movies/${movie._id}`}>
                                <Button className='card-button' variant='link'>Details</Button>
                            </Link>

                            <Button onClick={() => this.deleteFaveMovie(movie)}>Remove Movie</Button>

                        </Card>

                        )
                    })}

                </div>


        </Container>
    );

}
}

ProfileView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired,
        FavoriteMovies: PropTypes.array
        })
};