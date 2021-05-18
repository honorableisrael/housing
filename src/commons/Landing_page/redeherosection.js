import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import greypatch from "../../assets/greypatch.png";
import homesbg from "../../assets/homesbg.png";

const HeroSection = () => {
  return (
    <>
      <div className="redesignheroSection">
        <Container fluid={true} className="rg11">
          <Row className="shift_left">
            <Col md={6} className="pad_top">
              <div>
                <img
                  src={greypatch}
                  className="hero__vector homemainImage img-fluid"
                />
              </div>
              <article className="rdheroSection__headline">
                <h1 className="redesignheroSection__headline--main">
                  Properties | Mortgage | Insurance
                </h1>
                <p>
                  Housing Solution Fund provides Valuation, Sell, Buy, Mortgage,
                  Invest property and other Real Estate services worldwide
                </p>
                <div>
                  <Link className="btn-gtstrted" to="/signin">
                    Apply for a Home
                  </Link>
                </div>
              </article>
            </Col>
            <Col md={6} className="pad_top1">
              <img src={homesbg} className="homebg" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
