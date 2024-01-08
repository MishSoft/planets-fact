import { ContextProvider } from "./Context/Context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Mercury from "./components/Planets/Mercury";
import Venus from "./components/Planets/Venus";
import Earth from "./components/Planets/Earth";
import Mars from "./components/Planets/Mars";
import Jupiter from "./components/Planets/Jupiter";
import Saturn from "./components/Planets/Saturn";
import Uranus from "./components/Planets/Uranus";
import Neptune from "./components/Planets/Neptune";
import ThreeScene from "./components/Three/ThreeScene";
import { useState } from "react";

function App() {
  const [choosPlanet, setChoosPlanet] = useState(null);
  const handlePlanet = (obiect) => {
    setChoosPlanet(obiect);
  };

  return (
    <BrowserRouter>
      <Header setHandlePlanet={handlePlanet} />
      <Routes>
        <Route path="/" element={<ThreeScene />} />
        <Route path="/mercury" element={<Mercury planet={choosPlanet} />} />
        <Route path="/venus" element={<Venus planet={choosPlanet} />} />
        <Route path="/earth" element={<Earth planet={choosPlanet} />} />
        <Route path="/mars" element={<Mars planet={choosPlanet} />} />
        <Route path="/jupiter" element={<Jupiter planet={choosPlanet} />} />
        <Route path="/saturn" element={<Saturn planet={choosPlanet} />} />
        <Route path="/uranus" element={<Uranus planet={choosPlanet} />} />
        <Route path="/neptune" element={<Neptune planet={choosPlanet} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
