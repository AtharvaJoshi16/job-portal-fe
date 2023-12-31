/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "react-bootstrap";
import "./Register.scss";
import { useFormik } from "formik";
import { useCallback, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterPageProps } from "./Register.model";
import { useNavigate } from "react-router";
import { useTheme } from "@/components/theme-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Register = ({ onVerify, onSubmit }: RegisterPageProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "employee",
      password: "",
      orgId: "",
      employeeId: "",
      organization: "",
    },
    onSubmit: async (values) => {
      if (passwordMatched) {
        const response = await onSubmit?.(values);
        alert(response.message);
        navigate("/login");
      }
    },
  });
  console.log(formik.values.role);
  const [confPass, setConfPass] = useState("");
  const [verifyDisabled, setVerifyDisabled] = useState(false);
  const [warningText, setWarningText] = useState("");
  const [passwordMatched, setPasswordMatch] = useState(false);
  const comparePasswordFields = useCallback(() => {
    if (formik.values.password !== confPass) {
      setWarningText("Passwords do not match!");
      setPasswordMatch(false);
    } else {
      setWarningText("");
      setPasswordMatch(true);
    }
  }, [confPass, formik.values.password]);

  useEffect(() => {
    comparePasswordFields();
  }, [comparePasswordFields]);

  const handleVerify = async () => {
    const response = await onVerify?.(formik.values.email);
    alert(response.message);
    setVerifyDisabled(true);
  };

  return (
    <div className="register">
      <div
        className={`register__header ${
          theme === "dark" ? "register__header--dark" : ""
        }`}
      >
        REGISTER
      </div>
      <div className="register__form-wrapper">
        <Form
          className="register__form-wrapper__form"
          onSubmit={formik.handleSubmit}
        >
          <Select
            onValueChange={(selectedValue) =>
              formik.setFieldValue("role", selectedValue.toLowerCase())
            }
          >
            <SelectTrigger className="w-{30}">
              <SelectValue
                placeholder={
                  formik.values.role ? formik.values.role : "Choose a role"
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
          {formik.values.role === "recruiter" && (
            <>
              <Form.Group>
                <Input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formik.values.organization}
                  placeholder="Organization Name"
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Input
                  type="text"
                  id="orgId"
                  name="orgId"
                  value={formik.values.orgId}
                  placeholder="Organization ID"
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formik.values.employeeId}
                  placeholder="Employee ID"
                  onChange={formik.handleChange}
                  required
                />
              </Form.Group>
            </>
          )}
          <Form.Group>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              placeholder="First Name"
              onChange={formik.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              placeholder="Last Name"
              onChange={formik.handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="register__form-wrapper__form__email-wrapper">
            <Input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              placeholder="Email"
              onChange={formik.handleChange}
              required
            />
            <Button
              variant="outline"
              onClick={handleVerify}
              disabled={verifyDisabled}
            >
              Verify
            </Button>
          </Form.Group>
          <Form.Group>
            <Input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              placeholder="Password"
              onChange={formik.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={confPass}
              onChange={(e) => {
                setConfPass(e.target.value);
              }}
              placeholder="Confirm Password"
              required
            />
            {warningText && (
              <div className="register__form-wrapper__form__password-warning-text">
                <i className="bi bi-exclamation-triangle"></i>
                <p>{warningText}</p>
              </div>
            )}
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
