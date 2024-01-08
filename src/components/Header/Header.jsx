// import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function Header({ setHandlePlanet }) {
  const [isNav, setisNav] = useState(false);
  return (
    <motion.div
      transition={{
        ease: "linear",
        duration: 2,
        x: { duration: 1 },
      }}
      className="header"
    >
      <Link to="/" className="title">
        the planets
      </Link>
      <NavBar onSelectPlanet={setHandlePlanet} isNavActive={isNav} />
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        onClick={() => setisNav(!isNav)}
        className={`drop-menu-btn ${isNav ? "active-drop-menu-btn" : ""}`}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </motion.div>
    </motion.div>
  );
}

export default Header;
