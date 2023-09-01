import logo from '../assets/images/react-logo.png';
import './Header.css';

export default function Header(props) {
  return (
    <nav className="nav-bar"  style={{backgroundColor: "#00e673", width:"100%"}}>
      <p>
        <img src={logo} alt="logo" height="40" />
      </p>
      <ul>
        <li>
          <a href="/home">About</a>
        </li>
        <li>
          <a href="/contact-us">Contact</a>
        </li>
       
      </ul>
    </nav>
  );
}
