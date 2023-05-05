import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

const HomePage = () => {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.post(
        "/api/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1>Home Page</h1>
      {userData && <p>Welcome back!</p>}
    </Layout>
  );
};

export default HomePage;
