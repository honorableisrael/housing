import React from "react";
import "./landing.css";
import { Link } from "react-router-dom";
import { Col, Row, Form, Container } from "react-bootstrap";
import twitter from "../../assets/twitter.png";
import facebk from "../../assets/facecbk.png";
import gmail from "../../assets/google.png";
import Message from "../../assets/Message.png";
import logofooter from "../../assets/HSF-LOGO-01.png";
import log1 from "../../assets/Normal Icon.png";
import log2 from "../../assets/NormalIcon.png";
import ig from "../../assets/ig.png";
import fb from "../../assets/fb.png";
import partnners1 from "../../assets/shelterAfrice.png";
import partnners from "../../assets/infacredit.png";

const FooterSection = () => {
  return (
    <>
      <Row className="footer2a">
        <Col md={12}>
          <div className="footer2">Subscribe to our Newsletter</div>
          <div className="opptuny">
            Never miss an opportunity, put your emails address and get started
          </div>
          <div className="reff1">
            <Row className="center_23">
              <Col md={6}>
                <div className="ipos">
                  <img src={Message} className="Message2" />{" "}
                  <span className="subscribe2">Submit</span>
                </div>
                <input type="email" className="form-control footerimp" />
              </Col>
            </Row>
          </div>
        </Col>
        <Col className="footerimp123">
          <div className="footerimp12">
            <div className="info1">
              <div className="house123">
                <img src={logofooter} className="logofooter" />
              </div>
              <div className="pillos">
                <b> Housing Solution Fund </b>{" "}
                <span className="logoft">
                  {" "}
                  has gone above and beyond in helping is with our first home.
                  From advice and working around our schedules to sending us
                  assistance and minor renovations{" "}
                </span>
              </div>
            </div>
            <div className="info2">
              <div className="infow">Support</div>
              <div className="sending1">Help Videos</div>
              <div className="sending1">Accessories</div>
              <div className="sending1">View Bookings</div>
              <div className="sending1">Features</div>
              <div className="sending1">Terms and Policy</div>
            </div>
            <div className="info2">
              <div className="infow">About</div>
              <div className="sending1">Payment & Tax</div>
              <div className="sending1">Terms of Service</div>
              <div className="sending1">Contact</div>
              <div className="sending1">Announcement</div>
              <div className="sending1">News</div>
            </div>
            <div className="info2">
              <div className="infow">Our Address</div>
              <div className="sending1">
                Plot 15A Abayomi Durosinmi-Etti Street, Lekki Phase 1(Ocean
                Side), Lagos.
              </div>
              <div className="sending1">
                <img src={log1} className="log22" />
                <img src={log2} className="log22" />
                <img src={ig} className="log22" />
                <img src={fb} className="log22" />
              </div>
              <div className="sending1">Our Partners</div>
              <div className="sending1">
                <img src={partnners} className="sending12" />
              </div>
              <div className="sending1">
                <img src={partnners1} className="sending123" />
              </div>
            </div>
          </div>
        </Col>
        <Col md={12}>
          <div className="cpright">
            Copyright 2021, Alright Reserved. Housing Solution Fund
          </div>
        </Col>
      </Row>
    </>
  );
};

export default FooterSection;
