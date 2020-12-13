import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import './registration-view.scss';


export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [validated, setValidated] = useState(false);

    const handleRegister = (event) => {

        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropogation();
        }

        setValidated(true);


        event.preventDefault();
        axios.post('https://myflix-movie-application.herokuapp.com/users', {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        })
            .then(response => {
                const data = response.data;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(e => {
            console.log('An error has occurred while registering the user. Unable to register at this time.')
        })
    };

    return (
        <Container fluid className='registration-view'>
            <Row className='register-row'>
                <Col lg={6} className='register-header'>
                    <h1>Register with myFlix</h1>
                </Col>

                <Col lg={6}>
                    <Form className='registration-form' noValidate validated={validated}>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Create a Username: </Form.Label>
                            <Form.Control required type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                            <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                            <Form.Text className='text-muted'>Must be alphanumeric and be at least 7 characters</Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Create a Password: </Form.Label>
                            <Form.Control required type='text' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                            <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please choose a password.
                            </Form.Control.Feedback>
                            <Form.Text className='text-muted'>Must be alphanumeric and between 7-15 characters</Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label>Enter Email: </Form.Label>
                            <Form.Control required type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                            <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please type your email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='formBasicBirthday'>
                            <Form.Label>Enter Birthday: </Form.Label>
                            <Form.Control required type='text' placeholder='DD-MM-YYYY' value={birthday} onChange={e => setBirthday(e.target.value)} />
                            <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please type your birthday according to the format.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className='register-button' variant='success' type='submit' onClick={handleRegister}>Register</Button>
                        <br />
                        <Link to='/'>
                            <Button className='register-return-button' variant='secondary' type='submit'>Cancel</Button>
                        </Link>


                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

RegistrationView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        birthday: PropTypes.instanceOf(Date).isRequired
    }).isRequired
};