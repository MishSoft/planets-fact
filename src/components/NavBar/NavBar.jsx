import { motion } from "framer-motion";
// import { link } from "fs";
import { Link } from "react-router-dom";
import Planets from "../PlanetsData/Plaents";
// eslint-disable-next-line react/prop-types
function NavBar({ isNavActive, onSelectPlanet }) {
  return (
    <motion.nav
      transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 },
      }}
      className={`navigation ${isNavActive ? "navigation-active" : ""}`}
    >
      {Planets.map((item, id) => {
        return (
          <Link
            to={item.link}
            onClick={(e) => onSelectPlanet(e.target.innerText.toLowerCase())}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = item.backgroundColor;
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = item.backgroundColor;
            }}
            style={{
              border: `1px solid ${item.backgroundColor}`,
              color: item.backgroundColor,
            }}
            className="planet-btns"
            key={id}
          >
            {item.name}
          </Link>
        );
      })}
    </motion.nav>
  );
}

export default NavBar;
