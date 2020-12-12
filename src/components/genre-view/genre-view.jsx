import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        const { genre } = this.props;

        return (

            <Container className="genre-view">
                <Row className='genre-row'>
                    <Col className='genre-view_col'>

                        <div className="genre-name">
                            <span className="value">{genre.Name}</span>
                        </div>
                        <div className="genre-description">
                            <span className="value">{genre.Description}</span>
                        </div>

                        <Link to='/'>
                            <button className='return-button'>Return</button>
                        </Link>

                    </Col>
                </Row>
            </Container>
        );

    }
}

GenreView.propTypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
        })
};