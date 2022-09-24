import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">
        <li>Home</li>
      </Link>
      <Link to="tv">
        <li>Tv</li>
      </Link>
    </nav>
  );
}

export default Header;
