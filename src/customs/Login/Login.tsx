import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { Button } from "@/components/ui/button";
import "./Login.scss";
import { useNavigate } from "react-router";
import { CredentialResponse, LoginPageProps } from "./Login.model";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import { addToStorage } from "@/utils/localStorage.utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Login = ({ onLogin }: LoginPageProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
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
      <div
        className={`login__header ${
          theme === "dark" ? "login__header--dark" : ""
        }`}
      >
        LOGIN
      </div>
      <Form onSubmit={formik.handleSubmit} className="login__form">
        <Select
          onValueChange={(selectedValue) =>
            formik.setFieldValue("role", selectedValue.toLowerCase())
          }
        >
          <SelectTrigger className="w-{30}">
            <SelectValue
              placeholder={
                formik.values.role
                  ? formik.values.role.toUpperCase()
                  : "Choose a role"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["employee", "recruiter"].map((mode) => (
                <SelectItem value={mode}>{mode.toUpperCase()}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          required
        />
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        <Button type="submit">Login</Button>
      </Form>
      <div className="login__forgot-password">
        <Button variant="link" onClick={() => navigate("/reset-password")}>
          Forgot Password?
        </Button>
      </div>
      <div className="login__create-account">
        <p>
          Not an user?
          <Button
            size="sm"
            variant="link"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>
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
