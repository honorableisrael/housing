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
import { API } from "../../config";
import axios from "axios";

const FeaturedProperties = () => {
  const [state, setState] = React.useState({
    propertyList: [],
    error: "",
  });

  React.useEffect(() => {
    axios
      .all([axios.get(`${API}/general/featured-properties`)])
      .then(
        axios.spread((res) => {
          console.log(res.data.data);
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
  console.log(propertyList);
  return (
    <>
      <Row className="secwrap">
        <Tabs
          defaultActiveKey="home"
          className="flex22"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="home" title="Properties">
            <div className="flex-23">
              <div className="flex-w2 w2a fl33a">
                <span>
                  <img src={searchimg} className="searchimg" />
                </span>
                <input
                  type="text"
                  className="home_input"
                  placeholder="Name, State, City ..."
                />
              </div>
              <div className="flex-w2 w2 w2a">
                <span>
                  <img src={union} className="searchimg" />
                </span>
                <select className="home_input">
                  <option className="home_input">Property Type</option>
                </select>
              </div>
              <div className="flex-w2 w21">
                <span>
                  <img src={naira} className="searchimg" />
                </span>
                <input
                  type="text"
                  className="home_input "
                  placeholder="Maximum price"
                />
              </div>
              <div className="flex-w2 w21 hon">
                <div className="search_a">Search</div>
              </div>
            </div>
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
            {propertyList?.map((data) => (
              <PropertyCard
                submit_title={"View details"}
                property_details={data}
              />
            ))}
          </Carousel>
        </div>
      </Row>
    </>
  );
};

export default FeaturedProperties;
