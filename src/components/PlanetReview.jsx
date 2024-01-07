import React, { useEffect } from "react";
import PlanetDetail from "./PlanetDetails";
import ThreeScene from "./ThreeScene";

function PlanetReview({ selectedPlanetInfo }) {
  useEffect(() => {
    // Clear the planet details when the component mounts or selected planet changes
    console.log(selectedPlanetInfo)
  }, [selectedPlanetInfo]); // Add selectedPlanetInfo as a dependency

  return (
    <div>
      {selectedPlanetInfo ? (
        <div className="planet-details">
          <div id="planetDetails">
            <PlanetDetail planet={selectedPlanetInfo} />
            <div className="planet-right-side">
              <h2>{selectedPlanetInfo}</h2>
              <p>Description of planet</p>
              <span>
                Source: <a href="#">Link</a>
              </span>
            </div>
          </div>
          <div className="planet-details-footer">
            <div className="rotation-time">
              <h3>rotation time</h3>
              <h2>344</h2>
            </div>
            <div className="revolution-time">
              <h3>revolution-time</h3>
              <h2>344</h2>
            </div>
            <div className="radius">
              <h3>radius</h3>
              <h2>344</h2>
            </div>
            <div className="average-temp">
              <h3>average temp</h3>
              <h2>344</h2>
            </div>
          </div>
        </div>
      ) : (
        <ThreeScene />
      )}
    </div>
  );
}

export default PlanetReview;
