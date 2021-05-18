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
import sampleproperty from "../../assets/sampleproperty.png";
import Location from "../../assets/Location.png";

import FeaturedPropertyTabContent from "./FeaturedPropertyTabContent";

const FeaturedProperties = () => {
  return (
    <>
      <Row className="secwrap">
        <Tabs
          defaultActiveKey="profile"
          className="flex22"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="home" title="Properties">
            <FeaturedPropertyTabContent />
          </Tab>
          <Tab eventKey="profile" title="Rent to Own">
            <FeaturedPropertyTabContent />
          </Tab>
        </Tabs>
        <div className="featured_properties_wrapper">
          <div className="featured_properties">Featured Properties</div>
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
            </div>
          </div>
        </div>
      </Row>
    </>
  );
};

export default FeaturedProperties;
