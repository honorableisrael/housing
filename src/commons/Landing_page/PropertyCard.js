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
import FeaturedPropertyTabContent from "./FeaturedPropertyTabContent";
import searchimg from "../../assets/search_icon.png";
import union from "../../assets/Union.png";
import naira from "../../assets/naira.png";
import sampleproperty from "../../assets/sampleproperty.png";
import Location from "../../assets/Location.png";
import bedsimg from "../../assets/double-bed.png";
import shower from "../../assets/shower.png";
import homes from "../../assets/homes.png";

const PropertyCard = () => {
  return (
    <>
      {/* property card starts */}
      <div className="sampleproperty12">
        <div className="property_card">
          <img
            src={sampleproperty}
            alt="property_img"
            className="sampleprops12"
          />
        </div>
        <div className="card_second_area">
          <div className="pricea">$ 27,000,000</div>
          <div className="locationtext">
            <img src={Location} alt="Location" className="Location1" />
            Lekki pearl estate II, Lagos, Nigeria
          </div>
          <div className="cardbox_wrapper">
            <div className="cardbox_1">
              <img src={bedsimg} className="fet_1" />
              <div className="no_of_beds">4 Beds</div>
            </div>
            <div className="cardbox_1">
              <img src={shower} className="fet_1" />
              <div className="no_of_beds">4 Baths</div>
            </div>
            <div className="cardbox_1">
              <img src={homes} className="fet_1" />
              <div className="no_of_beds">2349 Sqft</div>
            </div>
          </div>
          <div className="fin_sec_card">
            <div>
              <div className="fin_stats">Financial Status</div>
              <div className="fin_info">Mortgage</div>
            </div>
            <div>
              <div className="btndetails">See details</div>
            </div>
          </div>
        </div>
      </div>
      {/* property card ends */}
    </>
  );
};

export default PropertyCard;
