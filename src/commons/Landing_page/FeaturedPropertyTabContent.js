import React from "react";
import Stanbic from "../../containers/Resource/new-stanbic-bank.png";
import AccessBank from "../../containers/Resource/new-access-bank.png";
import StandardChartered from "../../containers/Resource/new-standard-bank.png";
import FirstTrust from "../../containers/Resource/firsttrust.png";
import NMRC from "../../containers/Resource/nmrc.png";
import HomeBase from "../../containers/Resource/homebase.png";
import FamilyHomes from "../../containers/Resource/familyhomes.png";
import FederalMortgage from "../../containers/Resource/federal.png";
import "./landing.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Tab, Tabs, Row } from "react-bootstrap";
import searchimg from "../../assets/search_icon.png";
import union from "../../assets/Union.png";
import naira from "../../assets/naira.png";

const FeaturedPropertyTabContent = () => {
  return (
    <>
      <div className="flex-23">
        <div className="flex-w2 w2a fl33a">
          <span>
            <img src={searchimg} className="searchimg" />
          </span>
          <input
            type="text"
            className="home_input "
            placeholder="Name, State, City ..."
          />
        </div>
        <div className="flex-w2 w2 w2a">
          <span>
            <img src={union} className="searchimg" />
          </span>
          <select className="home_input">
            <option className="home_input">Property Type</option>
          </select>
        </div>
        <div className="flex-w2 w21">
          <span>
            <img src={naira} className="searchimg" />
          </span>
          <input
            type="text"
            className="home_input "
            placeholder="Maximum price"
          />
        </div>
        <div className="flex-w2 w21 hon">
          <div className="search_a">Search</div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPropertyTabContent;
