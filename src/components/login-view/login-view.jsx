import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        props.onLoggedIn(username);
    };

     const registerClick = () => {
         props.onRegister();
     }

    return (

        <Container fluid id='login-form'>
            <Row>
                <Col sm={12} lg={6}>
                    <h1>Welcome to MyFlix</h1>
                </Col>
                <Col sm={12} lg={6} className='form'>
                    <Form.Group controlId='formBasicUsername'>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId='formBasicPassword'>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type='text' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant='success' type='button' onClick={handleSubmit}>Login</Button>

                    <h3 className='register-text'>New to myFlix? Click here</h3>
                    <Button variant='primary' type='button' onClick={registerClick}>Register</Button>
                </Col>
            </Row>
        </Container>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    })
};