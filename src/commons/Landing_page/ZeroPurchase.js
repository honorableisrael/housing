import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import illustration from "../../assets/illustration.svg";
import RectangleHandshake from "../../assets/RectangleHandshake.png";
import greenbg from "../../assets/greenbg.png";
import spiralline from "../../assets/spiralline.png";


const PurchaseInfo = () => {
  return (
    <>
      <Row>
        <Col md={5}>
          <img src={illustration} alt="illustration" className="illustration" />
        </Col>
        <Col md={5} className="second_section12">
          <div>
            <img src={RectangleHandshake} className="RectangleHandshake" />
          </div>
          <div className="commission">Zero purchase commission</div>
          <div className="text_extns">
            Searching for a home? get help finding and financing your dream home
            today all commision free on HSF
          </div>
          <div className="afftest">Take the Affordability Test</div>
          <div className="paginationwrapper">
            <span className="pagination_1_active"></span>
            <span className="pagination_inactive"></span>
            <span className="pagination_inactive"></span>
          </div>
          <div className="textdst">
            <img src={greenbg} className="affdd" />
          </div>
        </Col>
        <Col md={1} className="spiralwrapper12">
          <div className={"spiralwrapper"}>
            <img src={spiralline} className="spiralline" alt={""} />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PurchaseInfo;
