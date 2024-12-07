import { Row } from "antd";
import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import DoctorList from "../components/DoctorList";
import Layout from "./../components/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const inactivityTimeout = useRef(null); // Use ref to store the timeout ID
  const INACTIVITY_LIMIT = 15000; // 15 seconds in milliseconds

  // Fetch doctors' data
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle logout due to inactivity
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token"); // Clear the token
    toast.error("Your session was ended due to inactivity.", {
      position: "top-center",
    }); // Use toast for the message
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  // Reset the inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current); // Clear the existing timeout
    }
    inactivityTimeout.current = setTimeout(() => {
      handleLogout(); // Log out user after inactivity
    }, INACTIVITY_LIMIT);
  }, [handleLogout]);

  // Set up activity listeners
  useEffect(() => {
    // Fetch initial data
    getUserData();

    // Reset timer on user activity
    const events = ["mousemove", "keydown", "click"];
    events.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );

    // Initialize timer on component mount
    resetInactivityTimer();

    // Cleanup on component unmount
    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
    };
  }, [resetInactivityTimer]);

  return (
    <Layout>
      <h3 className="text-center">Home Page</h3>
      <br />
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;

