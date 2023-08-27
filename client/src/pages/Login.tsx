import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  });

  const [errorState, setErrorState] = useState(null);

  const { currentUser, login } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserInput(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login(userInput);
      console.log(currentUser);

      navigate('/');
    } catch (error: any) {
      setErrorState(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="username" name="username" onChange={handleChange} />
        <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
        <button>Login</button>
        {errorState && <p>{errorState}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link></span>
      </form>
    </div>
  );
};

export default Login;
