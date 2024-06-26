import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal'

function DemoUser({navigate}) {

  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();

    return dispatch(sessionActions.login({ credential: "Demo-lition" , password: "password" }))
    .then(closeModal)
    .then(navigate('/'))

  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login">
        <button
          className='loginButtonModal'
          type="submit"
        >demo user</button>
      </div>
    </form >
    )
}

export default DemoUser;
