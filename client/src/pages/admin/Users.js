import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="m-1 btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h3 className="text-center m-2">Users List</h3>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;