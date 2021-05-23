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
import { Col, Row } from "react-bootstrap";
import download_prev_ui from "../../assets/firstframe.png";
import userframe from "../../assets/userframe.png";
import thirdframe from "../../assets/thirdframe.png";
import fourthframe from "../../assets/fourthframe.png";

const RealEstateDevelopers = () => {
  return (
    <>
      <Row className="propertylistings">
        <Col md={12}>
          <div className="main_title_123">Real Estate Developers</div>
          <div className="real_ds">
            <div className="box_wraper">
              <div className="box_wraper12">
                <img
                  src={download_prev_ui}
                  alt=""
                  className="download_prev_ui"
                />
                <div className="btext">Brains & Hammers</div>
                <div className="btext1">View Properties &gt;&gt;</div>
              </div>
              <div className="box_wraper12">
                <img src={userframe} alt="" className="download_prev_ui" />
                <div className="btext">Mixta Africa</div>
                <div className="btext1">View Properties &gt;&gt;</div>
              </div>
              <div className="box_wraper12">
                <img src={thirdframe} alt="" className="download_prev_ui" />
                <div className="btext">Urban Shelta</div>
                <div className="btext1">View Properties &gt;&gt;</div>
              </div>
              <div className="box_wraper12">
                <img src={thirdframe} alt="" className="download_prev_ui" />
                <div className="btext">Alphahead Group</div>
                <div className="btext1">View Properties &gt;&gt;</div>
              </div>
            </div>
            <div className="box_wraper">
              <div className="bonmp">
                <div className="ten12">10K</div>
                <div className="listings123">Property Listing Available</div>
              </div>
              <div className="bonmp">
                <div className="ten12">5000+</div>
                <div className="listings123">
                  Visitors each month
                </div>
              </div>
              <div className="bonmp">
                <div className="ten12">1st</div>
                <div className="listings123">Property experience</div>
              </div>
              <div className="bonmp">
                <div className="ten12">#1</div>
                <div className="listings123">Resource for property info</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default RealEstateDevelopers;
