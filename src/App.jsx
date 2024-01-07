import { useState } from "react";
import Header from "./components/Header";
import PlanetReview from "./components/PlanetReview";
// import ThreeScene from "./components/ThreeScene";

function App() {
  const [selectedPlanetInfo, setSelectedPlanetInfo] = useState(null);
  const [isNav, setIsNav] = useState(false);

  const selectedHandlePlanet = (planetIndo) => {
    setIsNav(false);
    setSelectedPlanetInfo(planetIndo.name);
  };

  return (
    <div className="container">
      <Header setSelectedPlanetIndo={selectedHandlePlanet} />
      <PlanetReview selectedPlanetInfo = {selectedPlanetInfo} />
    </div>
  );
}

export default App;
