//FUNCTIONAL IMPORTS
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

//DESIGN IMPORTS
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { faWalking } from "@fortawesome/free-solid-svg-icons";

// API CALL
const Stats = () => {

  const [startChoice, setStartChoice] = useState('');
  const [endChoice, setEndChoice] = useState('');
  const [results, setResults] = useState('');

  const handleRoute = (event) => {
    // setResults(event.target.value);
  }

  useEffect(() => {
    axios({
      url: "http://www.mapquestapi.com/directions/v2/route?",
      method: "GET",
      dataResponse: "json",
      params: {
        key: "F0QBceSH4eyAyQtIR0dAcCyKnwirHxxG",
        routeType: "fastest",
        transportMode: "AUTO",
        from: `${startPoint}`,
        to: `${endPoint}`,
        ambiguities: "ignore",
      },
    }).then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <section className="wrapper">
        <form action="">
          <div className="inputBox">
            <label name="startingPoint" aria-label="starting point">
              <input
                type="text"
                placeholder="Starting Point"
                value={startPoint}
                name="startingPoint"
                className="nameInput"
              />
            </label>

            <label name="destination" aria-label="destination">
              <input
                type="text"
                placeholder="Destination"
                value={endPoint}
                name="destination"
                className="nameInput"
              />
            </label>
          </div>
          <button type="submit" onClick={(event) => handleClick(event, )}> Find a Podcast</button>
        </form>
      </section>

      <div className="wrapper statsContainer">
        <div>
          <div className="iconImage">
            <div className="iconBorder icon">
              <FontAwesomeIcon className="i" icon={faBicycle} size="3x" />
            </div>
          </div>

          <div className="statsBox">
            <p>Distance:</p>
            <p>Time:</p>
          </div>
        </div>

        <div>
          <div className="iconImage">
            <div className="iconBorder icon">
              <FontAwesomeIcon className="i" icon={faWalking} size="3x" />
            </div>
          </div>
          <div className="statsBox">
            <p>Distance:</p>
            <p>Time:</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
