import logo from "../assets/images/react-logo.png"

export default function Header(props) {
    return (
      <nav className="nav-bar">
        <p><img src={logo} alt="logo" height="40" /></p>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/contact-us">Contact</a></li>
          <li><a href="/">Login</a></li>
        </ul>
      </nav>
    )
  }