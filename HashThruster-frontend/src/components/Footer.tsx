import LinkedinBlack from "../assets/images/icones/linkedin-logo-black.png"
import TwitterBlack from "../assets/images/icones/twitter-x-black.png"
import TelegramBlack from "../assets/images/icones/telegram-black.png"
import LinkedinWhite from "../assets/images/icones/linkedin-app-white-icon.png"
import TwitterWhite from "../assets/images/icones/x-social-media-white-icon.png"
import TelegramWhite from "../assets/images/icones/telegram-white-icon.png"

import { useLocation } from "react-router-dom";
const Footer = ({page}:{page:string;}) => {
  const location = useLocation();
  return (
    <footer className={page === "other" ? "other" : ""}>
      {location.pathname === "/" || window.innerWidth < 1024 ? <div>
        <a target="_blank" href="https://www.linkedin.com/showcase/hashthruster" id="arya">
          <img src={LinkedinBlack} alt="" />
        </a>
        <a target="_blank" href="https://x.com/HashThruster" id="arya">
          <img src={TwitterBlack} alt="" />
        </a>
        <a target="_blank" href="https://t.me/hashthruster" id="arya">
          <img src={TelegramBlack} alt="" />
        </a>
      </div> : <div>
      <a target="_blank" href="https://www.linkedin.com/showcase/hashthruster" id="arya">
          <img src={LinkedinWhite} alt="" />
        </a>
        <a target="_blank" href="https://x.com/HashThruster" id="arya">
          <img src={TwitterWhite} alt="" />
        </a>
        <a target="_blank" href="https://t.me/hashthruster" id="arya">
          <img src={TelegramWhite} alt="" />
        </a>
      </div>}
      <p>contact@hashthruster.com</p>
    </footer>
  );
};

export default Footer;
