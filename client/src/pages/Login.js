import { Form, Input, message } from "antd";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Submit for Login
  const submitHandler = async (values) => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post("/api/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (data.success) {
        localStorage.setItem("token", data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="register-page">
        <Form layout="vertical" onFinish={submitHandler}>
          <h1>Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <div className="d-flex justify-content-between">
            <Link to="/register">Not a User? Click Here to Register</Link>
            <button className="btn btn-primary">Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;