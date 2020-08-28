import React, {useState} from 'react';
import {Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import './Navbar.css';
import {
  Row, Col, Container, Button, Input, InputGroup, InputGroupAddon, InputGroupText,
  Dropdown, DropdownMenu, DropdownToggle, DropdownItem,
} from 'reactstrap';
import {exit} from '../../actions/authActions';
import Search from '../Search';
import {DiNodejs} from 'react-icons/di';
import {BiUserCircle} from 'react-icons/bi';
import logo from '../../assets/logo.svg';
import send from '../../assets/send.svg';
import camera from '../../assets/camera.svg';
import userLogo from '../../assets/user.svg';

const Navbar = ({user}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (  
    <nav className="navbar-nav navbar-expand-sm bg-light navbar-dark " >
      <div className="node-icon">
        <a target="_blank" href="https://nodejs.org/uk/">
          <DiNodejs size={150} color="green"  />
        </a>     
      </div>  
      <ul className="nav-content"> 
        <li >                 
          <Link to="/">
              <img src={logo} width="120px" alt="InstaRocket"></img>
          </Link>          
        </li>
        <li >
          <Search />  
        </li>
        <li >
          <div>
            <Link to="/direct">
                <img src={send} className ="nav-item" alt="Send direct"></img>
            </Link>          
            <Link to="/profile">
              <img src={userLogo} width="30px" alt="Profile"></img>  
            </Link> 
          </div>        
        </li>  
      </ul>  
    </nav>  
      
  );
}
const mapStateToProps = (state) => ({
  user: state.userReducer.herrUser,
});
const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(exit()),
})
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
