import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
import { Container, Row, Col } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";
import searchimg from "../../assets/property.png";
import skybluedes from "../../assets/skybluedes.png";
import homepurple from "../../assets/homepurple.png";
import illustration from "../../assets/illustration.svg";
import RectangleHandshake from "../../assets/RectangleHandshake.png";
import greenbg from "../../assets/greenbg.png";
import spiralline from "../../assets/spiralline.png";


const HowItWorks = () => {
  return (
    <Container fluid={true} className="howitworks_container">
      <div className="howitworks1">
        <div className="howitworks2 howitworks22">How it Works ?</div>
        <div className="cut_through_line"></div>
        <div className="how_234">
          <div className="box210">
            <div className="search23">
              <img src={searchimg} className="search3" />
            </div>
            <div className="search_title">Search your preferred</div>
            <div className="search_pref">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
              bibendum eget tellus non sed pretium magna enim. Dignissim et est
              et in sagittis tortor nec. Sagittis nullam id imperdiet pulvinar
              mauris.
            </div>
          </div>
          <div className="box210">
            <div className="search23 boxcolor2">
              <img src={skybluedes} className="search3" />
            </div>
            <div className="search_title">Check Affordabity</div>
            <div className="search_pref">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
              bibendum eget tellus non sed pretium magna enim. Dignissim et est
              et in sagittis tortor nec. Sagittis nullam id imperdiet pulvinar
              mauris.
            </div>
          </div>
          <div className="box210">
            <div className="search23 boxcolor3">
              <img src={homepurple} className="search3" />
            </div>
            <div className="search_title">Get your Dream Home</div>
            <div className="search_pref">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. A
              bibendum eget tellus non sed pretium magna enim. Dignissim et est
              et in sagittis tortor nec. Sagittis nullam id imperdiet pulvinar
              mauris.
            </div>
          </div>
        </div>
        <div className="secondsection">
          <Row>
            <Col md={5}>
              <img
                src={illustration}
                alt="illustration"
                className="illustration"
              />
            </Col>
            <Col md={5} className="second_section12">
              <div>
                <img src={RectangleHandshake} className="RectangleHandshake" />
              </div>
              <div className="commission">Zero purchase commission</div>
              <div className="text_extns">
                Searching for a home? get help finding and financing your dream
                home today all commision free on HSF
              </div>
              <div className="afftest">Take the Affordability Test</div>
              <div className="paginationwrapper">
                <span className="pagination_1_active">
                </span>
                <span className="pagination_inactive">
                </span>
                <span className="pagination_inactive">
                </span>
              </div>
              <div className="textdst">
                <img src={greenbg} className="affdd"/>
              </div>
            </Col>
            <Col md={1} className="spiralwrapper12">
              <div className={"spiralwrapper"}>
                <img src={spiralline} className="spiralline" alt={""}/>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
