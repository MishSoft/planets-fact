import { useEffect, useState } from "react";
import PlanetDetail from "./PlanetDetails";
import ThreeScene from "./ThreeScene";
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
function PlanetReview({ selectedPlanetInfo }) {
  const [planetData, setPlanetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedPlanetInfo) {
        try {
          // Fetch data from "Le système solaire" API
          const solarSystemApiUrl = `https://api.le-systeme-solaire.net/rest/bodies/${selectedPlanetInfo}`;
          const solarSystemResponse = await fetch(solarSystemApiUrl);
          const solarSystemData = await solarSystemResponse.json();
          setPlanetData(solarSystemData);

          // Fetch description from Wikipedia API using the origin parameter
          const wikipediaApiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles=${selectedPlanetInfo}&exintro=true&origin=*`;
          const wikipediaResponse = await fetch(wikipediaApiUrl);
          const wikipediaData = await wikipediaResponse.json();
          const wikipediaPage = Object.values(wikipediaData.query.pages)[0];

          // Filter out unwanted HTML elements
          const filteredText = wikipediaPage.extract
            .replace(/<p class="mw-empty-elt"> <\/p>/g, "")
            .replace(/<p><b>Earth<\/b>/g, "");

          // Combine data from both APIs
          setPlanetData((prevData) => ({
            ...prevData,
            wikipediaText: filteredText,
          }));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [selectedPlanetInfo]);

  return (
    <div>
      {selectedPlanetInfo && planetData ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.9,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="planet-details"
        >
          <div id="planetDetails">
            <PlanetDetail planet={selectedPlanetInfo} />
            <div className="planet-right-side">
              <h2>{planetData.englishName}</h2>
              <p>{planetData.wikipediaText}</p>
              <span>
                Source:{" "}
                <a
                  href={`https://en.wikipedia.org/wiki/${selectedPlanetInfo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia
                </a>
              </span>
            </div>
          </div>
          <div className="planet-details-footer">
            <div className="rotation-time">
              <h3>Rotation Time</h3>
              <h2>{planetData.sideralRotation} hours</h2>
            </div>
            <div className="revolution-time">
              <h3>Revolution Time</h3>
              <h2>{planetData.sideralOrbit} days</h2>
            </div>
            <div className="radius">
              <h3>Radius</h3>
              <h2>{planetData.meanRadius} km</h2>
            </div>
            <div className="average-temp">
              <h3>Average Temperature</h3>
              <h2>{planetData.avgTemp ? `${planetData.avgTemp} °C` : "N/A"}</h2>
            </div>
          </div>
        </motion.div>
      ) : (
        <ThreeScene />
      )}
    </div>
  );
}

export default PlanetReview;
