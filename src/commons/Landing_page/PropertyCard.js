import React from "react";
import {Link} from "react-router-dom";

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
import {Tab, Tabs, Row} from "react-bootstrap";
import FeaturedPropertyTabContent from "./FeaturedPropertyTabContent";
import searchimg from "../../assets/search_icon.png";
import union from "../../assets/Union.png";
import naira from "../../assets/naira.png";
import sampleproperty from "../../assets/sampleproperty.png";
import Location from "../../assets/Location.png";
import bedsimg from "../../assets/double-bed.png";
import shower from "../../assets/shower.png";
import homes from "../../assets/homes.png";
import { capitalize, FormatAmount } from "../User_Dashboard/controller";

const PropertyCard = ({ submit_title, property_details }) => {
  console.log(property_details);
  return (
    <>
      {/* property card starts */}
      <div className="sampleproperty12">
        <div className="property_card">
          <Link to={`/properties/${property_details?.slug}`}>
            <img
              src={sampleproperty}
              // src={property_details.property_cover_image?property_details.property_cover_image:sampleproperty}
              alt="property_img"
              className="sampleprops12"
            />
          </Link>
        </div>
        <div className="card_second_area">
          <div className="pricea">
            $ {FormatAmount(property_details?.property_price)}
          </div>
          <div className="locationtext">
            <img src={Location} alt="Location" className="Location1" />
            <Link to={`/properties/${property_details?.slug}`}>
              {property_details?.property_name}{" "}
              {property_details?.property_full_address}
            </Link>
          </div>
          <div className="cardbox_wrapper">
            <div className="cardbox_1">
              <img src={bedsimg} className="fet_1" />
              <div className="no_of_beds">
                {property_details?.property_bedrooms}{" "}
                {property_details?.property_bedrooms == 1 ? "Beds" : "Bed"}
              </div>
            </div>
            <div className="cardbox_1">
              <img src={shower} className="fet_1" />
              <div className="no_of_beds">
                {property_details?.property_bathrooms}{" "}
                {property_details?.property_bathrooms == 1 ? "Baths" : "Bath"}{" "}
              </div>
            </div>
            <div className="cardbox_1">
              <img src={homes} className="fet_1" />
              <div className="no_of_beds">
                {property_details?.property_size} Sqft
              </div>
            </div>
          </div>
          <div className='fin_sec_card'>
            <div>
              <div className="fin_stats">
                {property_details?.finance_options && "Financial Status"}
              </div>
              <div className="fin_info">
                {capitalize(property_details?.finance_options)}
              </div>
            </div>
            <div>
              <div className="btndetails">
                <Link to={`/properties/${property_details?.slug}`}>
                  {submit_title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* property card ends */}
    </>
  );
};

export default PropertyCard;
