import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import "../styles/profile.css";
import ProfileTabs from "../components/UI/profileComponents/ProfileTabs";
import Orders from "../components/UI/profileComponents/Orders";
import { useEffect } from "react";
import { getProfile } from "../Redux/Actions/UserActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import { findAllOrderUser } from "../Redux/Actions/OrderActions";
import PaginationComponent from "react-reactstrap-pagination";

const ProfileScreen = () => {
  const userProfile = useSelector((state) => state.userProfile);
  const { profile, loading, error } = userProfile;
  const allOrderUser = useSelector((state) => state.allOrderUser);
  const { orders, total } = allOrderUser;

  const [isProfile, setIsProfile] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const handleSelected = (selected) => {
    setPageNumber(selected);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
    dispatch(findAllOrderUser(7, pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Helmet title="Profile">
      <CommonSection title="Profile" />
      {loading && <Loading />}
      {error && <Message value="alert-danger">{error}</Message>}

      <section>
        <Container>
          <Row>
            <Col lg="4" className="shadow">
              <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                  <div className="author-card-avatar col-md-5">
                    <img src={profile?.pic} alt="userprofileimage" />
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{profile?.name}</strong>
                    </h5>
                    <p className="author-card-position">
                      <>{profile?.email}</>
                    </p>
                    <span className="author-card-position">
                      <>Joined Dec 12 2022</>
                    </span>
                  </div>
                </div>
              </div>
              <div className="wizard pt-3 ">
                <div className="d-flex align-items-start">
                  <div
                    className={
                      "nav align-items-start flex-column col-12 nav-pills me-3 "
                    }
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      className={isProfile ? " nav-link active" : "nav-link"}
                      type="button"
                      onClick={() => {
                        setIsProfile(true);
                      }}
                    >
                      Profile Settings
                    </button>
                    <button
                      className={
                        !isProfile
                          ? "nav-link d-flex justify-content-between active"
                          : "nav-link d-flex justify-content-between"
                      }
                      type="button"
                      onClick={() => {
                        setIsProfile(false);
                      }}
                    >
                      Orders List
                      <span className="badge2">{total}</span>
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              lg="8"
              className="shadow"
              id="v-pills-tabContent"
              style={{ height: "395px" }}
            >
              {isProfile ? (
                <div
                  className="tab-pane fade show active"
                  aria-labelledby="v-pills-home-tab"
                >
                  <ProfileTabs profile={profile} />
                </div>
              ) : (
                <div
                  className="tab-pane fade show active"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <Orders orders={orders} />
                  <PaginationComponent
                    className="float-end mt-4"
                    totalItems={total}
                    pageSize={7}
                    onSelect={handleSelected}
                    maxPaginationNumbers={4}
                    defaultActivePage={pageNumber}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProfileScreen;
