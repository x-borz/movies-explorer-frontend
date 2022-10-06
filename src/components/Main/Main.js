import Techs from "../Techs/Techs";
import './Main.css';
import AboutProject from "../AboutProject/AboutProject";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import NavTab from "../NavTab/NavTab";
import Promo from "../Promo/Promo";
import Notification from "../Notification/Notification";

function Main() {
  return (
    <main className="main">
      <Promo/>
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
      <Notification modifier='main'/>
    </main>
  );
}

export default Main;
