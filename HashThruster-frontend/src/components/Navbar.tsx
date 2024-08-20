import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <aside className="menu">
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/launchpad">Launchpad</Link>
        <Link to="/trends">Trends</Link>
      </nav>
    </aside>
  );
};

export default Navbar;
