import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import "./Login.scss";
import { useNavigate } from "react-router";
import { CredentialResponse, LoginPageProps } from "./Login.model";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const Login = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const resp = await onLogin?.(values);
      if (resp?.token) {
        const user = {
          id: resp?.userId,
          token: resp?.token,
          email: values?.email,
        };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Logged In");
        navigate("/");
      } else {
        alert(resp?.message);
      }
    },
  });

  const handleGoogleLoginSuccess = (response: CredentialResponse) => {
    let user = {};
    if (response?.credential) {
      user = jwtDecode(response?.credential);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div className="login">
      <div className="login__header">LOGIN</div>
      <Form onSubmit={formik.handleSubmit} className="login__form">
        <Form.Group>
          <Form.Control
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </Form.Group>
        <Button className="login__form__button" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <div
        className="login__forgot-password"
        onClick={() => navigate(`/reset-password`)}
      >
        <p>Forgot Password?</p>
      </div>
      <div className="login__create-account">
        <p>
          Not an user?{" "}
          <span
            className="login__create-account__link"
            onClick={() => navigate("/register")}
          >
            Create an account
          </span>
        </p>
      </div>
      <div className="login__google-login">
        <p className="login__google-login__or">OR</p>
        <GoogleLogin
          onSuccess={(response) => handleGoogleLoginSuccess(response)}
          onError={handleGoogleLoginError}
          useOneTap
        />
      </div>
    </div>
  );
};

export default Login;
