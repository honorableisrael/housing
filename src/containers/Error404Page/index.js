import React from "react";
import HomeNav from "../../commons/HomeNavbar/HomeNav";
import withNewStyles from "../../hocs/withNewStyles";
import lost from "../../assets/lost.png";
import "../../App.css";
import NewHeader from "../NewHeader";
import { Link } from "react-router-dom";

const StyledHeader = withNewStyles(NewHeader);

const Error404Page = ({ location: { pathname }, history }) => {
  return (
    <div className="container-fluid px-0">
      <HomeNav />
      <section className="fp-404-error">
        <div className="fp-error-404-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1 text-center">
              <div className="fp-error-404-wrapper">
                <p>
                  <img src={lost} className="lost1" />
                  <div className="paggnotfound otto">Page not found</div>
                  <div className="paggnotfound otto">
                    <Link to="/">Back to Homepage</Link>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Error404Page;
