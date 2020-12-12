import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {

    constructor() {
        super();

        this.state = {};
    }

    render() {

        const { director, movie } = this.props;

        return (

            <Container className="director-view">
                <Row className='director-row'>
                    <Col className='director-view_col'>

                        <div className="director-name">
                            <span className="label">Name: </span>
                            <span className="value">{director.Name}</span>
                        </div>
                        <div className="director-birth">
                            <span className="label">Born: </span>
                            <span className="value">{director.Birth}</span>
                        </div>
                        <div className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value">{director.Bio}</span>
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

DirectorView.propTypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired
        })
};