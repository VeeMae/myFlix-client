import React, { useState } from 'react';
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

    //No actual registration functionality for now
    const handleRegister = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onLoggedIn(username);

    };

    return (
        <Container fluid className='registration-view'>
            <Row className='register-row'>
                <Col lg={6} className='register-header'>
                    <h1>Register with myFlix</h1>
                </Col>

                <Col lg={6}>
                    <Form className='registration-form'>

                        <Form.Group controlId='formBasicUsername'>
                            <Form.Label>Create a Username: </Form.Label>
                            <Form.Control type='text' placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                            <Form.Text className='text-muted'>Must be alphanumeric and be at least 7 characters</Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicPassword'>
                            <Form.Label>Create a Password: </Form.Label>
                            <Form.Control type='text' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                            <Form.Text className='text-muted'>Must be alphanumeric and between 7-15 characters</Form.Text>
                        </Form.Group>

                        <Form.Group controlId='formBasicEmail'>
                            <Form.Label>Enter Email: </Form.Label>
                            <Form.Control type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId='formBasicBirthday'>
                            <Form.Label>Enter Birthday: </Form.Label>
                            <Form.Control type='text' placeholder='DD-MM-YYYY' value={birthday} onChange={e => setBirthday(e.target.value)} />
                        </Form.Group>

                        <Button className='register-button' variant='success' type='submit' onClick={handleRegister}>Register</Button>
                        <br/>
                         <Button className='register-return-button' variant='secondary' type='submit' onClick={user => this.onLoggedIn(user)}>Cancel</Button>

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
    })
};