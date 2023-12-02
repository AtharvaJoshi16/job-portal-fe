import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import "./Login.scss";
import { useNavigate } from "react-router";
import { CredentialResponse, LoginPageProps } from "./Login.model";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { addToStorage } from "@/utils/localStorage.utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
const Login = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      role: "employee",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const resp = await onLogin?.(values);
      if (resp?.token) {
        addToStorage("user", resp?.user);
        addToStorage("token", resp?.token);
        alert("Logged In");
        navigate("/jobs");
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
          <FormControl
            sx={{ width: "100%", marginBottom: "10px" }}
            size="small"
          >
            <InputLabel
              id="user-role-label"
              sx={{ fontFamily: "var(--rubik-regular)" }}
            >
              User role
            </InputLabel>
            <Select
              size="small"
              sx={{ fontFamily: "var(--rubik-regular)" }}
              labelId="user-role-label"
              id="user-role"
              value={formik.values.role}
              label="User role"
              onChange={(e) => {
                formik.setFieldValue("role", e.target.value);
              }}
            >
              <MenuItem
                sx={{ fontFamily: "var(--rubik-regular)" }}
                value="employee"
              >
                Employee
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "var(--rubik-regular)" }}
                value="recruiter"
              >
                Recruiter
              </MenuItem>
            </Select>
          </FormControl>
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
