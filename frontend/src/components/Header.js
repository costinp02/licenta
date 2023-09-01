import logo from '../assets/images/react-logo.png';

export default function Header(props) {
  return (
    <nav className="nav-bar"  >
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
