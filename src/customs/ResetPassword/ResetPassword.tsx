import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { ResetPasswordProps } from "./ResetPassword.model";
import "./ResetPassword.scss";
import { useNavigate } from "react-router";

const ResetPassword = ({ onResetPassword }: ResetPasswordProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await onResetPassword?.(newPassword, email);
    alert(response.message);
    navigate("/login");
  };
  return (
    <div className="reset-password">
      <Form onSubmit={(e) => handleSubmit(e)} className="reset-password__form">
        <Form.Group>
          <Form.Control
            type="text"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="text"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="success">
          Reset Password
        </Button>
      </Form>
    </div>
  );
};

export default ResetPassword;
