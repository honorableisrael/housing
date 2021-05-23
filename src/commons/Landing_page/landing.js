import React from "react";
import HomeNav from "../HomeNavbar/HomeNav";
import Herosection from "./redeherosection";
import HowItWorks from "./HowItWorks";
import VideoSection from "./redesignvideosection";
import FooterSection from "./redesignFooter";
import FeaturedProperties from "./FeaturedProperties";
import PropertyListing from "./PropertyListing";
import RealEstateDevelopers from "./RealEstateDevelopers";

const Landing_page = () => {
  return (
    <div>
      <HomeNav />
      <Herosection />
      <FeaturedProperties />
      <HowItWorks />
      <PropertyListing />
      <RealEstateDevelopers />
      <FooterSection/>
    </div>
  );
};
export default Landing_page;
