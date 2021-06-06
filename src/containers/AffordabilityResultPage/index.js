import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import MainHeader from "../../commons/HeaderV1";
import GeneralFooter from "../../commons/GeneralFooter";
import * as Icons from "react-feather";
import property_sample_img from "../../assets/property-sample-img.png";
import bed_icon from "../../assets/icons/bed.png";
import bath_icon from "../../assets/icons/bath.png";
import size_icon from "../../assets/icons/size.png";

import ProgressSlider from "../../commons/ProgressSlider";
import AfordabilityFormStepTwo from "../../commons/Forms/AfordabilityFormStepTwo";

import "./AffordabilityResultPage.css";
import ResultHeader from "../AffordabilityTestDownPayment/Resultheader";
import axios from "axios";
import { API } from "../../config";
import PropertyCard2 from "../../commons/Landing_page/PropertyCard2";


const AffordabilityResultPage = () => {
  const [state, setState] = useState({
    loaninformation: {},
    max_down_payment: 30,
    propertyList: [],
    ListOfHomeTypes: [],
    isloading: false,
    nextpageurl: "",
    prev_page_url:"",
    allinfo: {},
  });
  useEffect(() => {
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    const location_ = localStorage.getItem("location");
    const location = JSON.parse(location_);
    console.log(location?.location);
    setState({
      ...state,
      loaninformation: loan_info,
    });
    console.log(loan_info);
    window.scrollTo(-0, -0);
    axios
      .all([
        axios.get(`${API}/general/featured-properties`),
        axios.get(
          `${API}/general/property-affordability/${loan_info.loanable_amount}/${location?.location}`
        ),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res2.data);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              ListOfHomeTypes: res2.data.data,
              loaninformation: loan_info,
              isloading: false,
              allinfo: res2.data.data,
              next_page_url:res2.data.data.next_page_url,
              prev_page_url:res2.data.data.prev_page_url,
              
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

  const moveToNext = () => {
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    const location_ = localStorage.getItem("location");
    const location = JSON.parse(location_);
    console.log(location?.location);
    setState({
      ...state,
      loaninformation: loan_info,
    });
    console.log(loan_info);
    window.scrollTo(-0, -0);
    axios
      .all([
        axios.get(`${API}/general/featured-properties`),
        axios.get(`${nextpageurl}`),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res2.data);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              ListOfHomeTypes: res2.data.data,
              loaninformation: loan_info,
              isloading: false,
              allinfo: res2.data.data,
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
  };

  const prevPageUrl = () => {
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    const location_ = localStorage.getItem("location");
    const location = JSON.parse(location_);
    console.log(location?.location);
    setState({
      ...state,
      loaninformation: loan_info,
    });
    console.log(loan_info);
    window.scrollTo(-0, -0);
    axios
      .all([
        axios.get(`${API}/general/featured-properties`),
        axios.get(`${prev_page_url}`),
      ])
      .then(
        axios.spread((res, res2) => {
          console.log(res2.data);
          if (res.status === 200) {
            setState({
              ...state,
              propertyList: res.data.data,
              ListOfHomeTypes: res2.data.data,
              loaninformation: loan_info,
              isloading: false,
              allinfo: res2.data.data,
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
  };

  const { volume, propertyList,prev_page_url,nextpageurl, allinfo, loaninformation } = state;
  console.log(allinfo);

  return (
    <main className="theme-bg">
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Affordability Result - Housing Solution Fund | Real Estate, NHF,
          Mortgages &amp; Home Loans
        </title>
        <link rel="canonical" href="" />
      </Helmet>
      <MainHeader />
      <section className="affordability-result-page">
        <ResultHeader loandetails={loaninformation} />
      </section>

      <section className="property-affordable-list">
        <div className="container">
          <div className="property-affordable-list_wrapper row">
            <div className="offset-lg-2 col-lg-8">
              <div className="property-affordable-list-top-content">
                <h2>Filtered result for you</h2>
                <p>
                  Based on your Affordability result, we have filtered down
                  properties that are suitable and affordable to you.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="property-cards-wrapper">
                <div className="row">
                  <div className="col-md-12">
                    <div className="flex12a">
                      {
                      propertyList?.map((data) => (
                        <PropertyCard2
                          submit_title={"Choose me"}
                          property_details={data}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="pagination-counter">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link icons"
                            href="#"
                            aria-label="Previous"
                          >
                            <Icons.ChevronLeft size="15" 
                                onClick={prevPageUrl}
                            />
                          </a>
                        </li>
                        {/* <li className="page-item">
                          <a className="page-link" href="#">
                            1
                          </a>
                        </li>
                        <li className="page-item ">
                          <a className="page-link active " href="#">
                            2
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            ...
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            9
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            10
                          </a>
                        </li> */}
                        <li className="page-item">
                          <a
                            className="page-link icons"
                            aria-label="Next"
                            onClick={moveToNext}
                          >
                            <Icons.ChevronRight
                              size="15"
                            />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p className="pagination-result-counter">
                      <strong>
                        {allinfo?.current_page} of {allinfo.total}
                      </strong>{" "}
                      showing based on Affordability Test
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="banner-cta">
        <div className="container">
          <div className="banner-cta-wrapper">
            <div className="row">
              <div className="offset-lg-2 col-lg-8">
                <div className="banner-cta-content">
                  <p>
                    Still dont get what you are looking for, we can make
                    provision based on your suggestions
                  </p>
                  <a className="waiting-list-cta">Join the waiting list</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GeneralFooter />
    </main>
  );
};
export default AffordabilityResultPage;
