import axios from "axios";
import React, { useEffect, useState } from "react";



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
    <div>
      <h1>Home Page</h1>
      {userData && (
        <p>
          Welcome back, {userData.name}! 
        </p>
      )}
    </div>
  );
};

export default HomePage;
