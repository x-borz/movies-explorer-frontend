import './Logo.css';
import {Link} from "react-router-dom";

function Logo({modifier}) {
  return (
    <Link className={`logo ${modifier ? 'logo_place_' + modifier : ''}`} to="/"></Link>
  );
}

export default Logo;
