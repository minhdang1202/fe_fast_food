import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import MainProfile from "../../components/Profile/MainProfile";
import RightSide from "../../components/Profile/RightSide";
import "../../styles/Shipper/profile.css";

const ProfilePage = () => {
  return (
    <section
      className="content-main font-lexend"
      style={{ height: "calc(100vh - 97px)" }}
    >
      <Row style={{ height: "100%" }}>
        <Col
          lg="9"
          className="d-flex flex-column flex-row-fluid container col-main p-0"
        >
          <MainProfile />
        </Col>
        <Col lg="3">
          <RightSide />
        </Col>
      </Row>
    </section>
  );
};

export default ProfilePage;
