import styled from '@emotion/styled';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


const Wrapper = styled.div`
  /* //////////////////////////////////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  //////////// Table of Content //////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////
  ////////////////////////////////////////////

    1.Declaring Variables
      1a. Colors
      1b. Typography
      1c. Reusuables
    2.General Styles
    3.Typography
    4.Home Page Layouts
      4a. Main Wrapper (Homepage Wrapper)
      4b. Header
      4c. Hero
      4d. Partners
      4d. Steps Section
      4e. Benefits Section (Why Us)
      4f. Testimonials
      4g. FAQs
      4h.	Prefoot
      4i.	Footer

    5.Components
      5a. Buttons
      5b. Form & Input Fields

    6. Select Mortgage Page

    7. Application Page */
  /* ////////////////////////////////////////
  //////// 1. Declaring Variables //////////
  //////////////////////////////////////// */
  :root {
    /* ///// 1a. Colors /////// */
    /* Main Colors */
  
`;

const withNewStyles = (TargetComponent) => {
  return withRouter(class extends Component {
    render() {
      const { pathname } = this.props.location;
      const pageWrapperClass = {
        '/': 'main-wrapper',
        '/get-started': 'get-started-wrapper',
        '/application': 'application-page-wrapper',
        '/application/nhf': 'application-page-wrapper',
        '/select-lender': 'select-lender-wrapper'
      }[pathname];

      return (
        <Wrapper className={pageWrapperClass}>
          <TargetComponent {...this.props} />
        </Wrapper>
      );
    }
  })
};

export default withNewStyles;