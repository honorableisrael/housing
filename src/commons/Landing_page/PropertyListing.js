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
import { Col, Row, Pagination } from "react-bootstrap";
import PropertyCard from "./PropertyCard";
import { API } from "../../config";
import axios from "axios";

const PropertyListing = () => {
  const [state, setState] = React.useState({
    propertyList: [],
    propertyunder: 1000000,
    error: "",
  });

  React.useEffect(() => {
    axios
      .all([axios.get(`${API}/general/property-below-price/${state.propertyunder}`)])
      .then(
        axios.spread((res) => {
          console.log(res);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              isloading: false,
            });
          }
        })
      )
      .catch((err) => {
        console.log(err.response);
        setState({
          ...state,
          isloading: false,
        });
      });
  }, []);

  const { propertyList, error } = state;
  console.log(propertyList)
  return (
    <>
      <Row className="propertylistings">
        {/* <Col md={12}>
          <div className="main_title_12">Property Listing</div>
          <div className="main_title_123">Recent Listings</div>
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
            <PropertyCard submit_title={"View details"} />
            <PropertyCard submit_title={"View details"} />
            <PropertyCard submit_title={"View details"} />
            <PropertyCard submit_title={"View details"} />
          </Carousel>
        </Col> */}
        <Col md={12}>
          <br /> <br />
          <div className="main_title_123">Properties under $15,000,000</div>
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
            {propertyList?.map((data) => (
              <PropertyCard
                submit_title={"View details"}
                property_details={data}
              />
            ))}
          </Carousel>
        </Col>
        <Col md={12} className="button_send12">
          <div className="button_send button_send34">View All Properties</div>
        </Col>
      </Row>
    </>
  );
};

export default PropertyListing;
