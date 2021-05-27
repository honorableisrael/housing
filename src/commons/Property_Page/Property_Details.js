import React, { useState } from "react";
import HomeNav from "../HomeNavbar/HomeNav";
import PropertyCard from "../Landing_page/PropertyCard";
import { Container, Col, Row, Pagination } from "react-bootstrap";
import Exclude from "../../assets/Exclude.png";
import Location from "../../assets/Location.png";
import top_slide from "../../assets/details.png";
import cars from "../../assets/car.png";
import bedsimg from "../../assets/double-bed.png";
import shower from "../../assets/shower.png";
import homes from "../../assets/homes.png";
import "./property.css";
import FooterSection from "../Landing_page/redesignFooter";
import { Link } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";

const Property_Details = () => {
  const [state, setState] = useState({
    scheduled_tour: true,
    request_info: false,
    preferred_time: "",
    preferred_year: "",
    contact_type: "",
    name: "",
    phone: "",
    message: "",
    email: "",
    propertyList: [],
    propertyunder: 1000000,
    error: "",
  });


  React.useEffect(() => {
    axios
      .all([
        axios.get(`${API}/general/property-below-price/${state.propertyunder}`),
      ])
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

  console.log(propertyList);

  const setNewTab = () => {
    if (scheduled_tour) {
      return setState({
        ...state,
        request_info: true,
        scheduled_tour: false,
      });
    }
    if (request_info) {
      setState({
        ...state,
        request_info: false,
        scheduled_tour: true,
      });
    }
  };
  const {
    scheduled_tour,
    request_info,
    preferred_time,
    preferred_year,
    message,
    propertyList,
    error,
    contact_type,
    name,
    phone,
    email,
  } = state;

  const changeHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <HomeNav />
      <Container fluid={true} className="property111 property111b">
        <Row>
          <Col md={12}>
            <div className="main_title_123 mainrelative">
              <span className="hborhood hborhood1">
                {" "}
                <Link to={"/properties"}>&#8592; Back to Search </Link>
              </span>
            </div>
          </Col>
          <Col md={12} className="h34">
            <Row className="h34">
              <Col md={8} className="h34">
                <img src={top_slide} className="top_slide" />
              </Col>
              <Col md={3} className="hjt">
                <div>
                  <img src={top_slide} className="top_slide__2" />
                </div>
                <div>
                  <img src={top_slide} className="top_slide__1" />
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={12} className="h34">
            <Row className="h34">
              <Col md={8}>
                <div className="fbdroom23">
                  <div className="fbdroom">
                    <div className="ll2a boldtxt1">
                      {" "}
                      4 Bedrooms semi-detached duplex with BQ{" "}
                    </div>
                    <div className="ll23">
                      <img src={Location} className="Location" />
                      Lekki penisula II, Lekki Lagos State, Nigeria
                    </div>
                  </div>
                  <div>
                    <div className="smltext">From</div>
                    <div className="boldtxt1">$ 27, 000,000.00 </div>
                    <div className="search_a llm">Get prequalified</div>
                  </div>
                </div>
                <Col md={8} className="crd23">
                  <div className="cardbox_wrapper">
                    <div className="cardbox_1 no_boxes">
                      <img src={bedsimg} className="fet_1" />
                      <div className="no_of_beds ">4 Beds</div>
                    </div>
                    <div className="cardbox_1 no_boxes">
                      <img src={shower} className="fet_1" />
                      <div className="no_of_beds">4 Baths</div>
                    </div>
                    <div className="cardbox_1 no_boxes">
                      <img src={homes} className="fet_1" />
                      <div className="no_of_beds">2349 Sqft</div>
                    </div>
                    <div className="cardbox_1 no_boxes">
                      <img src={cars} className="fet_1" />
                      <div className="no_of_beds">2 Cars</div>
                    </div>
                  </div>
                  <div className="cardbox_wrapper2">
                    <div>
                      <div>Property Status</div>
                      <div className="contstr2">Under Construction</div>
                    </div>
                    <div>
                      <div>Property Title</div>
                      <div className="contstr2">Under Construction</div>
                    </div>
                    <div>
                      <div>Building Permits</div>
                      <div className="contstr2">No</div>
                    </div>
                  </div>
                </Col>
                <Col md={12} className="contstr3">
                  <div className="desc_110a">Description</div>
                  <div className="desc_110">
                    Morerbt ipsum dolor sit amet, consectetur adipiscing elit.
                    Scelerisque aliquet turpis lectus quam blandit facilisis
                    egestas. Egestas aliquam nunc pharetra, ullamcorper nibh
                    libero diam. Ac volutpat, lacus dignissim at sagittis, et.
                    Nisl phasellus blandit semper massa donec magna egestas
                    tempor, volutpat. Dignissim ullamcorper viverra et ornare
                    euismod maecenas lorem at. Ac scelerisque sed ultrices
                    ornare libero quam. In ac vel, eu integer non. blandit
                    semper massa donec magna egestas tempor, volutpat. Dignissim
                    ullamcorper viverra et ornare euismod maecenas lorem at. Ac
                    scelerisque sed ultrices ornare libero quam. In ac vel, eu
                    integer non.
                  </div>
                </Col>
                <Col md={12} className="contstr3">
                  <div className="amentities">
                    <div className="title_amenities">Amenities</div>
                    <div className="amenities_body">
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Fitted Kitchen
                      </div>
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Cart Port
                      </div>
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Treated Water
                      </div>
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Sewage Treatment
                      </div>
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Drainage
                      </div>
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Paved Road
                      </div>
                      <div className="feature12">
                        <img src={Exclude} className="Exclude" />
                        Power transformer
                      </div>
                    </div>
                  </div>
                  <div className="desc_110a desc_11xz ">Property Types</div>
                  <div className="amentities amentities1">
                    <div className="amenities_body">
                      <div className="Exclude">Terrace</div>
                      <div className="Exclude">$27,000,000.00</div>
                      <div>
                        <span className="available1">Available</span>{" "}
                      </div>
                    </div>
                    <div className="amenities_body Exclude2">
                      <div className="Exclude">Semi-detached</div>
                      <div className="Exclude ">$37,000,000.00</div>
                      <div>
                        <span className="available1 soldout">Sold out</span>{" "}
                      </div>
                    </div>
                  </div>
                </Col>
              </Col>
              <Col md={3} className="hjt mxx1">
                <div className="bb12a">
                  <div className="bb12">
                    <div
                      className={
                        scheduled_tour ? "bb12ap" : "inactive_tab bb12ap"
                      }
                      onClick={setNewTab}
                    >
                      Schedule Tour
                    </div>
                    <div
                      className={
                        request_info ? "bb12ap" : "inactive_tab bb12ap"
                      }
                      onClick={setNewTab}
                    >
                      Request info
                    </div>
                  </div>
                  {scheduled_tour && (
                    <>
                      <div className="preff12">
                        <div className="reftime">Select preferred year</div>
                        <input
                          type="date"
                          placeholder="Enter date"
                          onChange={changeHandler}
                          className="form-control reftime2"
                          name="preferred_year"
                          value={preferred_year}
                        />
                      </div>
                      <div className="preff12">
                        <div className="reftime ">Select preferred time</div>
                        <input
                          type="time"
                          placeholder="Enter date"
                          onChange={changeHandler}
                          className="form-control reftime2"
                          name="preferred_time"
                          value={preferred_time}
                        />
                      </div>
                      <Row className="bb12az">
                        <Col md="5" className="bb12a22">
                          <div className="reftime">Name</div>
                          <input
                            type="text"
                            onChange={changeHandler}
                            placeholder=""
                            name="name"
                            value={name}
                            className="form-control reftime2 ref2d"
                          />
                        </Col>
                        <Col md="5" className="bb12a22">
                          <div className="reftime ref1d">Phone</div>
                          <input
                            type="text"
                            onChange={changeHandler}
                            placeholder=""
                            name="phone"
                            value={phone}
                            className="form-control reftime2 ref1d"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="preff12ax">
                          <div className="preff12">
                            <div className="reftime">Email</div>
                            <input
                              type="email"
                              placeholder=""
                              onChange={changeHandler}
                              style={{ width: "102%" }}
                              name="email"
                              value={email}
                              className="form-control reftime2"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="ll34">
                          <span className="ll34z">
                            <label for="contact_type" class="">
                              <input
                                type="radio"
                                name="contact_type"
                                onChange={changeHandler}
                                className="contact_type"
                              />
                              In Person
                              <span class="checkmark"></span>
                            </label>
                          </span>
                          <span>
                            <label for="contact_type" class="">
                              <input
                                type="radio"
                                name="contact_type"
                                onChange={changeHandler}
                                className="contact_type"
                              />
                              Video Chat
                              <span class="checkmark"></span>
                            </label>
                          </span>
                        </Col>

                        <Col md={12}>
                          <div className="schedultour">
                            <div className="schdl hf22">Schedule a Tour</div>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                  {request_info && (
                    <>
                      <Row className="bb12az">
                        <Col md="5" className="bb12a22">
                          <div className="reftime">Name</div>
                          <input
                            type="text"
                            onChange={changeHandler}
                            placeholder=""
                            name="name"
                            value={name}
                            className="form-control reftime2 ref2d"
                          />
                        </Col>
                        <Col md="5" className="bb12a22">
                          <div className="reftime ref1d">Phone</div>
                          <input
                            type="text"
                            onChange={changeHandler}
                            placeholder=""
                            name="phone"
                            value={phone}
                            className="form-control reftime2 ref1d"
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="preff12ax">
                          <div className="preff12">
                            <div className="reftime">Email</div>
                            <input
                              type="email"
                              placeholder=""
                              onChange={changeHandler}
                              style={{ width: "102%" }}
                              name="email"
                              value={email}
                              className="form-control reftime2"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12} className="za">
                          <div className="reftime">Message</div>
                          <textarea
                            value={message}
                            name="message"
                            onChange={changeHandler}
                            className="form-control reftime2 xza"
                            placeholder=""
                          ></textarea>
                        </Col>

                        <Col md={12}>
                          <div className="schedultour">
                            <div className="schdl hf22">Schedule a Tour</div>
                          </div>
                        </Col>
                      </Row>
                    </>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <FooterSection />
    </>
  );
};
export default Property_Details;
