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
            <Col md={6} className="pad_top move2s">
              <div>
                <img
                  src={greypatch}
                  className="hero__vector homemainImage img-fluid"
                />
              </div>
              <article className="rdheroSection__headline">
                <h1 className="redesignheroSection__headline--main">
                  Home <span className="thinfont"></span> of{" "}
                  <span className="thinfont"></span> Affordable Mortgages
                </h1>
                <p className="solution_intro">
                  <span className="heroheader"> Housing Solution Fund </span>{" "}
                  <b>
                    provides valuation, Sell, Buy, Mortgage, Invest property and
                    other Real Estate services worldwide
                  </b>
                </p>
                <div>
                  <Link className="btn-gtstrted" to="/signin">
                    Apply for a Home
                  </Link>
                </div>
              </article>
            </Col>
            <Col md={6} className="pad_top1 move2s">
              <img src={homesbg} className="homebg" />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HeroSection;
