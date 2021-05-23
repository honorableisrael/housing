import React from "react";
import HomeNav from "../HomeNavbar/HomeNav";
import PropertyCard from "../Landing_page/PropertyCard";
import { Container, Col, Row,Pagination } from "react-bootstrap";
import searchimg from "../../assets/search_icon.png";
import union from "../../assets/Union.png";
import naira from "../../assets/naira.png";
import "./property.css";
import FooterSection from "../Landing_page/redesignFooter";

const Property_Page = () => {
  return (
    <>
      <HomeNav />
      <Container fluid={true} className="property111">
        <Row>
          <Col md={12}>
            <div className="d121">
              <div className="flex-23 p_122">
                <div className="flex-w2 w2a fl33a">
                  <span>
                    <img src={searchimg} className="searchimg" />
                  </span>
                  <input
                    type="text"
                    className="home_input home12"
                    placeholder="Name, State, City ..."
                  />
                </div>
                <div className="flex-w2 w2 w2a">
                  <span>
                    <img src={union} className="searchimg" />
                  </span>
                  <select className="home_input home12">
                    <option className="home_input">Property Type</option>
                  </select>
                </div>
                <div className="flex-w2 w21 w2a">
                  <span>
                    <img src={naira} className="searchimg" />
                  </span>
                  <input
                    type="text"
                    className="home_input home12"
                    placeholder="Maximum price"
                  />
                </div>
                <span className="flex-w2 w21 w2a w22a">
                  <span>
                    <img src={naira} className="searchimg" />
                  </span>
                  <input
                    type="text"
                    className="home_input home12"
                    placeholder="Property Status"
                  />
                </span>
              </div>
              <div className="flex-w2 w21 hon">
                <div className="search_a">Search</div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <div className="main_title_123">
              <span className="hborhood"> Neighborhood, City, State</span>
              <div className="val12">
                <b> 10000+</b> Homes Available on Housing Solution Fund
              </div>
            </div>
            <div className="flex12a">
              <PropertyCard submit_title={"View details"} />
              <PropertyCard submit_title={"View details"} />
              <PropertyCard submit_title={"View details"} />
              <PropertyCard submit_title={"View details"} />
              <PropertyCard submit_title={"View details"} />
              <PropertyCard submit_title={"View details"} />
            </div>
            <Col md={12}>
              <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Next />
                <Pagination.Last />
              </Pagination>
            </Col>
            <div className="p_12 p_12ee">
              <div className="search_a submitbtn">
                Take the Affordability Test
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <FooterSection/>
    </>
  );
};
export default Property_Page;
