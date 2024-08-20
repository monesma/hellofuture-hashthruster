import Logo from "../assets/images/logo_white.png";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <header className="headerHome">
      <img src={Logo} alt="" />
      <Link to="/dashboard">Go to dashboard</Link>
    </header>
  );
};

export default HeaderHome;
