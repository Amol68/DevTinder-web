import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
//import defaultUser from "../assets/images/defaultUser.jpeg";
import ConnectionCard from "./ConnectionCard";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  console.log("connections state", connections);
  const fetchConnections = async () => {
    try {
      const connections = await axios.get(baseUrl + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(connections?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1>Connections not found !</h1>;

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center my-10 gap-2">
         <ConnectionCard/>
      </div>
    </div>
  );
};

export default Connections;
