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

  const fetchConnections = async () => {
    try {
      const res = await axios.get(baseUrl + "/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return <h1 className="text-center text-gray-300 mt-10">Connections not found!</h1>;

  return (
    <div className="flex justify-center items-center w-full px-4">
      <div className="flex flex-col my-10 gap-4 w-full max-w-4xl">
        {connections.map((user) => {
          const { firstName, lastName, about, age, gender, photoUrl, _id } = user;

          return (
            <ConnectionCard
              key={_id}
              firstName={firstName}
              lastName={lastName}
              about={about}
              age={age}
              gender={gender}
              photoUrl={photoUrl}
            />
          );
        })}
      </div>
    </div>
  );
};


export default Connections;
