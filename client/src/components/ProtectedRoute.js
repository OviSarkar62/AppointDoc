import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";


export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
  
    useEffect(() => {
      const getUser = async () => {
        try {
          dispatch(showLoading());
          const {data} = await axios.post(
            "/api/user/getUserData",
            { token: localStorage.getItem("token") },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (data.success) {
            dispatch(setUser(data.data));
          } else {
            localStorage.clear();
            <Navigate to="/login" />;
          }
        } catch (error) {
          localStorage.clear();
          dispatch(hideLoading());
          console.log(error);
        }
      };
      
      if (!user) {
        getUser();
      }
    }, [user, dispatch]);
  
    if (localStorage.getItem("token")) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }
  

