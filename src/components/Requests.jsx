/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import defaultUser from "../assets/images/defaultUser.jpeg";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  console.log({ requests });
  const fetchRequests = async () => {
    console.log("fetch requests called");
    try {
      const res = await axios.get(baseUrl + "/user/requests/received", {
        withCredentials: true,
      });
      console.log("request received", res?.data?.data);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-center my-10 gap-1">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, about } = request.fromUserID;
          console.log("logs", { firstName, lastName, photoUrl, about });
          return (
            <div
              key={request._id}
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

              <button className="btn btn-primary">Accept</button>
              <button className="btn btn-secondary">Reject</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
