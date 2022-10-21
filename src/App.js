import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);

function App() {

  const [name, setName] = useState('');
  const [success, setSuccess] = useState('');
  const [registered, setRegistered] = useState(false)
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = event =>{
    setName(event.target.value)
  }

  const handleEmailBlur = event => {
    setEmail(event.target.value)
  }

  const handlePasswordBlur = event => {
    setPassword(event.target.value)
  }

  const handleRegisterChange = event =>{
    setRegistered(event.target.checked)
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {

      event.stopPropagation();
      return;
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      setError('Password should contain at least one Upper case')
      return;
    }
    setValidated(true);
    setError('')

    if(registered){
      signInWithEmailAndPassword(auth, email, password)
      .then(result =>{
        const user = result.user;
        console.log(user)
      })
      .catch(error =>{
        setError(error.message)
      })
    }
    else{
      createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user)
        setEmail('')
        setPassword('')
        emailVerification()
        updateUserName()
        setSuccess('user create successfully. YAH!!')
      })
      .catch(error => {
        setError(error.message)
      })
    }
    event.preventDefault()
  }

  const updateUserName = () =>{
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() =>{
      console.log('Updating the user name')
    })
    .catch(error =>{
      console.error(error.message)
    })
  }

  const emailVerification = () =>{
    sendEmailVerification(auth.currentUser)
    .then(() =>{
      console.log('Email verification sent.')
    })
  }

  const handlePasswordReset = () =>{
    sendPasswordResetEmail(auth, email)
    .then(() =>{
      console.log('password sent')
    })
  }

  return (
    <div>
      <div className="form-container w-50 mx-auto mt-3">
        <h2 className='text-primary'>Please {registered ? 'Login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your name</Form.Label>
            <Form.Control onBlur={handleUserName} type="name" placeholder="Enter name" required />
            <Form.Control.Feedback type="invalid">
              Please provide your name.
            </Form.Control.Feedback>
          </Form.Group>}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <p className='text-danger'>{error}</p>
            <p className='text-primary'>{success}</p>
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
            <Form.Group className="mb-3 text-primary" controlId="formBasicCheckbox">
              <Form.Check onChange={handleRegisterChange} type="checkbox" label="Already Register?" />
            </Form.Group>
          </Form.Group>
          <Button onClick={handlePasswordReset} variant='link'>Forgot password?</Button>
          <br />
          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
