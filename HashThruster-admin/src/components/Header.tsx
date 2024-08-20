import Logo from "../assets/images/logo_white.png"
import {Link, useNavigate} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectAdmin, logoutAdmin } from "../store/adminSlice"

const Header = () => {
  const admin = useSelector(selectAdmin)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const disconnect = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.localStorage.removeItem("hash-token")
    dispatch(logoutAdmin())
    navigate('/login')
  }
  
  return (
    <header>
      <Link to="/"><img src={Logo} alt="Logo HashThruster"/></Link>
      {admin.isLogged ? <nav>
        {admin.infos.role === "superAdmin" && <Link to="/addToken" >Add token</Link>}
        <Link to="/profile"><i className="fa-solid fa-user"></i></Link>
        <a href="#"
          onClick={disconnect}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
        </a> 
      </nav>: <Link to="/login">Login</Link>}
    </header>
  )
}

export default Header