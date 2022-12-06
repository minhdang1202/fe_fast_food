import React, { useRef, useEffect } from "react";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Actions/UserActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // setTimeout(() => {}, 1000);
    userInfo && toast.success("Đăng nhập thành công");
    userInfo?.role === 1 && navigate("/home");
    userInfo?.role === 0 && navigate("/admin");
    userInfo?.role === 2 && navigate("/shipper");
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(loginNameRef.current.value, loginPasswordRef.current.value));
  };

  return (
    <Helmet title="Login">
      <CommonSection title="Login" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              {error && <Message value="alert-danger">{error}</Message>}
              {loading && <Loading />}
              <form className="form mb-5" onSubmit={submitHandler}>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    ref={loginNameRef}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    ref={loginPasswordRef}
                  />
                </div>
                <button type="submit" className="addTOCart__btn">
                  Login
                </button>
              </form>
              <Link to="/register">
                Don't have an account? Create an account
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
