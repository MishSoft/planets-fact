// import React from 'react'
import Stars from "../Three/Stars";
import ChoosedPlanet from "../Three/ChoosedPlanet";
function Venus({ planet }) {
  return (
    <div className="planet-detail-component">
      <Stars>
        <div className="choosed_details" id="choosed">
          {planet && <ChoosedPlanet planet={planet} />}
        </div>
      </Stars>
    </div>
  );
}

export default Venus;
