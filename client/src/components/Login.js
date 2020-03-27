import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [state, setState] = useState({
    credentials: {
      username: '',
      password: ''
    }
  });

  const handleChange = e => {
    setState({
      credentials: {
        ...state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  const login = e => {
    e.preventDefault();
      axiosWithAuth()
      .post('/api/login', state.credentials)
      .then(res => {
        window.localStorage.setItem('token', JSON.stringify(res.data.payload));
        props.history.push('/private');
      })
      .catch(err => console.log(err.response));
  };

  return (
    <>
      <form onSubmit={login}>
            <input
              type="text"
              name="username"
              value={state.credentials.username}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={state.credentials.password}
              onChange={handleChange}
            />
            <button>Log in</button>
          </form>
    </>
  );
};

export default Login;
