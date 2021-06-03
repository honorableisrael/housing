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

const AffordabilityResultPage = () => {
  const [state, setState] = useState({
    loaninformation: {},
    max_down_payment: 30,
  });
  useEffect(() => {
    const loan_ = localStorage.getItem("loan_result");
    const loan_info = JSON.parse(loan_);
    setState({
      ...state,
      loaninformation: loan_info,
    });
  }, []);
  const { volume, max_down_payment, loaninformation } = state;
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
                  <div className="col-lg-4">
                    <div className="property-cards">
                      <div
                        className="property-img"
                        style={{
                          backgroundImage: "url(" + property_sample_img + ")",
                        }}
                      ></div>
                      <div className="property-cards-info">
                        <div className="price-location">
                          <h4>$ 27,000,000</h4>
                          <p>
                            <Icons.MapPin size="15" />
                            Lekki pearl estate II, Lagos, Nigeria
                          </p>
                        </div>
                        <div className="amenities">
                          <div className="bed">
                            <img src={bed_icon} alt="Beds" />
                            <span>4 beds</span>
                          </div>
                          <div className="bath">
                            <img src={bath_icon} alt="Baths" />
                            <span>4 Baths</span>
                          </div>
                          <div className="dimension">
                            <img src={size_icon} alt="sqft" />
                            <span>2800 sqft</span>
                          </div>
                        </div>
                        <div className="status-cta">
                          <div className="status">
                            <h4>Financial Status</h4>
                            <p>Mortgage</p>
                          </div>
                          <div className="cta">
                            <button
                              className="cta-btn"
                              type="button"
                              onClick={() =>
                                (window.location.href =
                                  "/affordability-test/down-payment")
                              }
                            >
                              Choose Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="property-cards">
                      <div
                        className="property-img"
                        style={{
                          backgroundImage: "url(" + property_sample_img + ")",
                        }}
                      ></div>
                      <div className="property-cards-info">
                        <div className="price-location">
                          <h4>$ 27,000,000</h4>
                          <p>
                            <Icons.MapPin size="15" />
                            Lekki pearl estate II, Lagos, Nigeria
                          </p>
                        </div>
                        <div className="amenities">
                          <div className="bed">
                            <img src={bed_icon} alt="Beds" />
                            <span>4 beds</span>
                          </div>
                          <div className="bath">
                            <img src={bath_icon} alt="Baths" />
                            <span>4 Baths</span>
                          </div>
                          <div className="dimension">
                            <img src={size_icon} alt="sqft" />
                            <span>2800 sqft</span>
                          </div>
                        </div>
                        <div className="status-cta">
                          <div className="status">
                            <h4>Financial Status</h4>
                            <p>Mortgage</p>
                          </div>
                          <div className="cta">
                            <button
                              className="cta-btn"
                              type="button"
                              onClick={() =>
                                (window.location.href =
                                  "/affordability-test/down-payment")
                              }
                            >
                              Choose Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="property-cards">
                      <div
                        className="property-img"
                        style={{
                          backgroundImage: "url(" + property_sample_img + ")",
                        }}
                      ></div>
                      <div className="property-cards-info">
                        <div className="price-location">
                          <h4>$ 27,000,000</h4>
                          <p>
                            <Icons.MapPin size="15" />
                            Lekki pearl estate II, Lagos, Nigeria
                          </p>
                        </div>
                        <div className="amenities">
                          <div className="bed">
                            <img src={bed_icon} alt="Beds" />
                            <span>4 beds</span>
                          </div>
                          <div className="bath">
                            <img src={bath_icon} alt="Baths" />
                            <span>4 Baths</span>
                          </div>
                          <div className="dimension">
                            <img src={size_icon} alt="sqft" />
                            <span>2800 sqft</span>
                          </div>
                        </div>
                        <div className="status-cta">
                          <div className="status">
                            <h4>Financial Status</h4>
                            <p>Mortgage</p>
                          </div>
                          <div className="cta">
                            <button
                              className="cta-btn"
                              type="button"
                              onClick={() =>
                                (window.location.href =
                                  "/affordability-test/down-payment")
                              }
                            >
                              Choose Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="property-cards">
                      <div
                        className="property-img"
                        style={{
                          backgroundImage: "url(" + property_sample_img + ")",
                        }}
                      ></div>
                      <div className="property-cards-info">
                        <div className="price-location">
                          <h4>$ 27,000,000</h4>
                          <p>
                            <Icons.MapPin size="15" />
                            Lekki pearl estate II, Lagos, Nigeria
                          </p>
                        </div>
                        <div className="amenities">
                          <div className="bed">
                            <img src={bed_icon} alt="Beds" />
                            <span>4 beds</span>
                          </div>
                          <div className="bath">
                            <img src={bath_icon} alt="Baths" />
                            <span>4 Baths</span>
                          </div>
                          <div className="dimension">
                            <img src={size_icon} alt="sqft" />
                            <span>2800 sqft</span>
                          </div>
                        </div>
                        <div className="status-cta">
                          <div className="status">
                            <h4>Financial Status</h4>
                            <p>Mortgage</p>
                          </div>
                          <div className="cta">
                            <button
                              className="cta-btn"
                              type="button"
                              onClick={() =>
                                (window.location.href =
                                  "/affordability-test/down-payment")
                              }
                            >
                              Choose Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="property-cards">
                      <div
                        className="property-img"
                        style={{
                          backgroundImage: "url(" + property_sample_img + ")",
                        }}
                      ></div>
                      <div className="property-cards-info">
                        <div className="price-location">
                          <h4>$ 27,000,000</h4>
                          <p>
                            <Icons.MapPin size="15" />
                            Lekki pearl estate II, Lagos, Nigeria
                          </p>
                        </div>
                        <div className="amenities">
                          <div className="bed">
                            <img src={bed_icon} alt="Beds" />
                            <span>4 beds</span>
                          </div>
                          <div className="bath">
                            <img src={bath_icon} alt="Baths" />
                            <span>4 Baths</span>
                          </div>
                          <div className="dimension">
                            <img src={size_icon} alt="sqft" />
                            <span>2800 sqft</span>
                          </div>
                        </div>
                        <div className="status-cta">
                          <div className="status">
                            <h4>Financial Status</h4>
                            <p>Mortgage</p>
                          </div>
                          <div className="cta">
                            <button
                              className="cta-btn"
                              type="button"
                              onClick={() =>
                                (window.location.href =
                                  "/affordability-test/down-payment")
                              }
                            >
                              Choose Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="property-cards">
                      <div
                        className="property-img"
                        style={{
                          backgroundImage: "url(" + property_sample_img + ")",
                        }}
                      ></div>
                      <div className="property-cards-info">
                        <div className="price-location">
                          <h4>$ 27,000,000</h4>
                          <p>
                            <Icons.MapPin size="15" />
                            Lekki pearl estate II, Lagos, Nigeria
                          </p>
                        </div>
                        <div className="amenities">
                          <div className="bed">
                            <img src={bed_icon} alt="Beds" />
                            <span>4 beds</span>
                          </div>
                          <div className="bath">
                            <img src={bath_icon} alt="Baths" />
                            <span>4 Baths</span>
                          </div>
                          <div className="dimension">
                            <img src={size_icon} alt="sqft" />
                            <span>2800 sqft</span>
                          </div>
                        </div>
                        <div className="status-cta">
                          <div className="status">
                            <h4>Financial Status</h4>
                            <p>Mortgage</p>
                          </div>
                          <div className="cta">
                            <button
                              className="cta-btn"
                              type="button"
                              onClick={() =>
                                (window.location.href =
                                  "/affordability-test/down-payment")
                              }
                            >
                              Choose Me
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="pagination-counter">
                      <ul className="pagination">
                        <li className="page-item">
                          <a
                            className="page-link disable icons"
                            href="#"
                            aria-label="Previous"
                          >
                            <Icons.ChevronLeft size="15" />
                          </a>
                        </li>
                        <li className="page-item">
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
                        </li>
                        <li className="page-item">
                          <a
                            className="page-link icons"
                            href="#"
                            aria-label="Next"
                          >
                            <Icons.ChevronRight size="15" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <p className="pagination-result-counter">
                      <strong>6 of 30</strong> showing based on Affordability
                      Test
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
