import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function NavBar({ isNavActive, onSelectPlanet }) {
  const planets = [
    {
      name: "mercury",
      backgroundColor: "#419EBB",
    },
    {
      name: "venus",
      backgroundColor: "#EDA249",
    },
    {
      name: "earth",
      backgroundColor: "#6D2ED5",
    },
    {
      name: "mars",
      backgroundColor: "#D14C32",
    },
    {
      name: "jupiter",
      backgroundColor: "#D83A34",
    },
    {
      name: "saturn",
      backgroundColor: "#CD5120",
    },
    {
      name: "uranus",
      backgroundColor: "#1EC1A2",
    },
    {
      name: "neptune",
      backgroundColor: "#2D68F0",
    },
  ];
  return (
    <motion.nav
      className={`navigation ${isNavActive ? "navigation-active" : ""}`}
    >
      {planets.map((item, id) => {
        return (
          <button
            onClick={() => onSelectPlanet({ name: item.name })}
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
          </button>
        );
      })}
    </motion.nav>
  );
}

export default NavBar;
