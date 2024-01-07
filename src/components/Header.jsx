// import React from 'react'
import { useState } from "react";
import { motion } from "framer-motion";
import NavBar from "./NavBar";

function Header({ setSelectedPlanetIndo }) {
  const [isNav, setisNav] = useState(false);

  return (
    <header className="header">
      <h1 className="title">the planets</h1>
      <NavBar onSelectPlanet={setSelectedPlanetIndo} isNavActive={isNav} />
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
    </header>
  );
}

export default Header;
