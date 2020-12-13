import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { format } from 'path';

import './update-profile.scss';


export function UpdateProfile(props) {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState('');
    const [birthday, updateBirthday] = useState('');

    const [validated, setValidated] = useState(false);

    const handleUpdate = (event) => {
        const form = event.currentTarget;
        event.preventDefault();

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropogation();
        }

        setValidated(true);

        const token = localStorage.getItem('token');
        const userName = localStorage.getItem('user');

        axios.put(`https://myflix-movie-application.herokuapp.com/users/${userName}`, {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(response => {
                const data = response.data;
                localStorage.setItem('user', data.username);
                alert('You have successfully updated your profile.');
                window.open('/users/:username', '_self');
            })
            .catch((error) => {
                console.log(error);
                alert('An error has occurred. Please check that you have typed in valid data.')
            });
    }


    return (

        <div className='update-profile'>

            <h2>Update Profile</h2>

            <Form noValidate validated={validated}>

                <Form.Group controlId='formBasicUsername'>

                    <Form.Label>Change Username:</Form.Label>
                    <Form.Control required type='text' value={username} placeholder='Change username' onChange={e => updateUsername(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a username.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId='formBasicPassword'>

                    <Form.Label>Change Password:</Form.Label>
                    <Form.Control required type='text' value={password} placeholder='Change password' onChange={e => updatePassword(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose a password.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId='formBasicEmail'>

                    <Form.Label>Change Email:</Form.Label>
                    <Form.Control required type='text' value={email} placeholder='Change email' onChange={e => updateEmail(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please choose an email.
                    </Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId='formBasicBirthday'>

                    <Form.Label>Change Birthday:</Form.Label>
                    <Form.Control required type='text' value={birthday} placeholder='DD-MM-YYYY' onChange={e => updateBirthday(e.target.value)} />
                    <Form.Control.Feedback>&#10003;</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                        Please enter a valid birthday.
                    </Form.Control.Feedback>

                </Form.Group>

            </Form>

            <Button type='submit' onClick={handleUpdate}>Update</Button>
            <Link to='/users/username'>
                <Button>Cancel</Button>
            </Link>


        </div>

    )
}

UpdateProfile.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        email: PropTypes.string,
        birthday: PropTypes.instanceOf(Date)
    })
}