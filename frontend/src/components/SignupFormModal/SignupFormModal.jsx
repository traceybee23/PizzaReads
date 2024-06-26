import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let errObj = {}
    if (email && !emailRegex.test(email)) errObj.email = "email is invalid."
    if(username && username.trim().length < 4) errObj.username = "username must be more than 4 characters"
    if(firstName && firstName.trim().length < 1) errObj.firstName = "first name must be more than 1 character"
    if(lastName && lastName.trim().length < 1) errObj.lastName = "last name must be more than 1 character"
    if(password && password.length < 6) errObj.password = "password must be more than 6 characters"
    if(password !== confirmPassword) errObj.confirmPassword = "confirm password field must be the same as the password field"
    setErrors(errObj)
  }, [password, confirmPassword, username, email, firstName, lastName])



  return (
    <div className='signup-modal'>
      <h1 className='heading'>sign up</h1>
      <form onSubmit={handleSubmit}>
        {errors.email && <span className='errors'>{errors.email}</span>}
        {errors.username && <span className='errors'>{errors.username}</span>}
        {errors.firstName && <span className='errors'>{errors.firstName}</span>}
        {errors.lastName && <span className='errors'>{errors.lastName}</span>}
        {errors.password && <span className='errors'>{errors.password}</span>}
        {errors.confirmPassword && <span className='errors'>{errors.confirmPassword}</span>}
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            value={lastName}
            placeholder="last name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <div className='signupButton'>
          <button
          className='login-button'
          type="submit"
          disabled={!email || !password || !username || !firstName || !lastName || !!Object.values(errors).length}>sign up</button>
        </div>
      </form>
      <span >
          already on pizzareads?
          <OpenModalMenuItem
          itemText={<span className="modalLink">log in</span>}
          modalComponent={<LoginFormModal />}
          />
      </span>
    </div>
  );
}

export default SignupFormModal;
