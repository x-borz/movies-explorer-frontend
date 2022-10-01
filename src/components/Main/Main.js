import Techs from "../Techs/Techs";
import './Main.css';
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";

function Main(props) {
  return (
    <main className="main">
      <Promo/>
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </main>
  );
}

export default Main;
