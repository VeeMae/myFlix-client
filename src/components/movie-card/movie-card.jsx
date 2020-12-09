import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './movie-card.scss';


export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;
        return (
                <Card border='dark'>
                <Card.Img variant='top' src={movie.ImagePath} />
                <Card.Header>
                    <Card.Body>
                        <Card.Title as='h1'>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                    </Card.Body>
                </Card.Header>
                     <Button className='card-button' onClick={() => onClick(movie)} variant='link'>Details</Button>
                </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};