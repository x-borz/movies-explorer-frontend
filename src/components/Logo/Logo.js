import './Logo.css';

function Logo({modifier}) {
  return (
    <a className={`logo ${modifier ? modifier : ''}`} href="#"></a>
  );
}

export default Logo;
