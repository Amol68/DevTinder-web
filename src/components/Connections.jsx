import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import defaultUser from "../assets/images/defaultUser.jpeg";
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
        {connections.length ? (
          connections.map((connection) => {
            const { firstName, lastName, photoUrl, about } = connection;

            return (
              <div
                key={connection._id}
                className="flex  gap-x-5 items-center border"
              >
                <img
                  src={photoUrl || defaultUser}
                  className="rounded-full size-20"
                />

                <div>
                  <h3>{firstName + " " + lastName}</h3>
                  <p>{about}</p>
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Connections;
