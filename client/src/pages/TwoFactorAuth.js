import React from "react";
import { Form, Input } from "antd";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email; // Get the email passed from Login

  const submitHandler = async (values) => {
    try {
      const { data } = await axios.post("/api/user/verify-2fa", {
        email,
        code: values.code,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("Login Successful");
        navigate("/"); // Redirect to homepage after verification
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="register-page">
      <Form layout="vertical" onFinish={submitHandler}>
        <h1>2-Factor Authentication</h1>
        <p>Enter the 6-digit code sent to your email.</p>
        <Form.Item
          label="6-Digit Code"
          name="code"
          rules={[{ required: true, message: "Please enter the code" }]}
        >
          <Input type="text" maxLength={6} />
        </Form.Item>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/login" style={{ textDecoration: "underline" }}>
            &larr; Back to Login
          </Link>
          <button className="btn btn-primary" type="submit">
            Verify
          </button>
        </div>
      </Form>
    </div>
  );
};

export default TwoFactorAuth;
