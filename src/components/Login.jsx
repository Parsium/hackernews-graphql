import React, { useState } from 'react';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const SIGNUP_MUTATION = gql`
    mutation SignUpMotation($email: String!, $password: String!, $name: String!) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`
const LOGIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

// Changed from private attribute from class component, how to make private??
// Trigger mutations needed for login.
function confirm(async) {
    // TO IMPLEMENT
}

// Changed from private attribute from class component, how to make private??
function saveUserData(token) {
    localStorage.setItem(AUTH_TOKEN, token); // NOT TO BE USED IN PRACTICE. UNSAFE.
}

const Login = () => {
    // Store login details in state.
    const defaultDetails = {
        login: true,
        email: '',
        password: '',
        name: '',
    };
    const [loginDetails, setLoginDetails] = useState(defaultDetails);
    const { login, email, password, name } = loginDetails;

    // Mutations
    const [loginMutation] = useMutation(
        LOGIN_MUTATION,
        { onCompleted: data => { confirm(data) } }
    );
    const [signupMutation] = useMutation(
        SIGNUP_MUTATION,
        { onCompleted: data => { confirm(data) } }
    );

    return (
        <div>
            <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
            <div className="flex flex-column">
                {!login && (
                    <input
                    value={name}
                    onChange={e => {
                        let newName = e.target.value;
                        setLoginDetails(prevState => {
                            return {...prevState, name: newName};
                        });
                    }}
                    type="text"
                    placeholder="Your name"
                    />
                )}
                <input
                    value={email}
                    onChange={e => {
                        let newEmail = e.target.value;
                        setLoginDetails(prevState => {
                            return {...prevState, email: newEmail};
                        });
                    }}
                    type="text"
                    placeholder="Your email address"
                />
                <input
                    value={password}
                    onChange={e => {
                        let newPassword = e.target.value;
                        setLoginDetails(prevState => {
                            return {...prevState, password: newPassword};
                        });
                    }}
                    type="password"
                    placeholder="Choose a safe password"
                />
            </div>
            <div className="flex mt3">
                <div className="pointer mr2 button" onClick={() => confirm()}>
                    {login ? 'login' : 'create account'}
                </div>
                <div
                    className="pointer button"
                    onClick={() => setLoginDetails(prevState => {
                        let prevLogin = prevState.login;
                        return { ...prevState, login: !prevLogin }
                    })}
                >
                    {login
                    ? 'need to create an account?'
                    : 'already have an account?'}
                </div>
            </div>
        </div>
    );

};
export default Login;

