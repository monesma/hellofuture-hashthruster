import { HashConnectConnectButton } from "./hashconnect/hashconnect-client";
import Logo from "../assets/images/logo_white.png";
import { Link } from "react-router-dom";
import ScreenSize from "../helpers/ScreenSize";

const Header = () => {
  const screenW = ScreenSize().width;

  return (
    <header className="headerDash">
      <Link to="/">
        <img src={Logo} alt="Logo" />
      </Link>
      <div>
        {screenW > 1024 && (
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/launchpad">Launchpad</Link>
            <Link to="/trends">Trends</Link>
          </nav>
        )}
        <div>
          <HashConnectConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
