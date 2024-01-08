// import React from 'react'
import Stars from "../Three/Stars";
import ChoosedPlanet from "../Three/ChoosedPlanet";
function Earth({ planet }) {
  console.log(planet);
  return (
    <div className="planet-detail-component">
      <Stars>
        <div className="choosed_details" id="choosed">
          {planet && <ChoosedPlanet planet={planet} />}
          <div className="planet-right-side">
            <h2>{planet}</h2>
            <p>{planet}</p>
            <span>Source: <a href="#">Link</a></span>
          </div>
          <div className="planet-details-footer">
            <div className="rotation-time">
              <h3>rotation time</h3>
              <h2>20</h2>
            </div>
            <div className="revolution-time">
              <h3>revolution time</h3>
              <h2>20</h2>
            </div>
            <div className="radius">
              <h3>radius</h3>
              <h2>20</h2>
            </div>
            <div className="average-temp">
              <h3>average temp</h3>
              <h2>20</h2>
            </div>
          </div>
        </div>
      </Stars>
    </div>
  );
}

export default Earth;
