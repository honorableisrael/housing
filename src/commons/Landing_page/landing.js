import React from 'react';
import HomeNav from '../HomeNavbar/HomeNav';
import Herosection from './redeherosection';
import RedsgnStepSection from './redesignstep_section';
import VideoSection from './redesignvideosection';
import FooterSection from './redesignFooter';
import FeaturedProperties from './FeaturedProperties';

const Landing_page = ()=>{
    return(
        <div>
            <HomeNav/>
            <Herosection/>
            <FeaturedProperties/>
            {/* <RedsgnStepSection/> */}
            {/* <VideoSection/> */}
            {/* <FooterSection/> */}
        </div>
    )
}
export default Landing_page;