import './Logo.css';
import {Link} from "react-router-dom";

function Logo({modifier}) {
  return (
    <Link className={`logo ${modifier ? modifier : ''}`} to="/"></Link>
  );
}

export default Logo;
