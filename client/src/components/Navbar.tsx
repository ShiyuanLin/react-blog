import { useContext } from 'react';
import Logo from '../imgs/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logo picture" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?category=daily"><h6>DAILY</h6></Link>
          <Link className="link" to="/?category=coding"><h6>CODING</h6></Link>
          <Link className="link" to="/?category=technology"><h6>TECHNOLOGY</h6></Link>
          <Link className="link" to="/?category=bike"><h6>BIKE</h6></Link>
          <Link className="link" to="/?category=outdoor"><h6>OUTDOOR</h6></Link>
          <Link className="link" to="/?category=food"><h6>FOOD</h6></Link>
          <span>{ currentUser?.username }</span>
          { currentUser ? <span onClick={ logout }>Logout</span> : <Link className='link' to='/login'>Login</Link>}
          <span className="write">
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
