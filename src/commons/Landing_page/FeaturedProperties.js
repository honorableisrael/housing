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
import PropertyCard from "./PropertyCard";

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
          <div className="featured_properties fl-a1">
            <span>Featured Properties</span>
            <span className="prp12">
              <span className="property19">Properties</span>
              <span className="property19 property19active">Rent to own</span>
            </span>
          </div>
          <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlay={true}
            autoPlaySpeed={4000}
            centerMode={false}
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite={true}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 3,
                paritialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: {
                  max: 710,
                  min: 0,
                },
                items: 1,
                paritialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 710,
                },
                items: 2,
                paritialVisibilityGutter: 30,
              },
            }}
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
            className="centerpositon"
          >
            <PropertyCard submit_title={"View details"}/>
            <PropertyCard submit_title={"View details"}/>
            <PropertyCard submit_title={"View details"}/>
            <PropertyCard submit_title={"View details"}/>
          </Carousel>
        </div>
      </Row>
    </>
  );
};

export default FeaturedProperties;
