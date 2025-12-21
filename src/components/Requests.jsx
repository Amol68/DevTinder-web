import axios from "axios";
import React, { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

import RequestCard from "./RequestCard";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests) || [];
 
  
  const fetchRequests = async () => {
   
    try {
      const res = await axios.get(baseUrl + "/requests/received", {
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
    <div className="flex justify-center items-center w-full">
  <div className="flex flex-col my-10 gap-4 w-[90%] max-w-4xl ">

    {requests.length > 0 &&
      requests.map((request) => {
     

        return (
          <div
            key={request._id}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-700 bg-[#1f1f26] shadow-sm"
          >
            <RequestCard request={request}/>
          </div>
        );
      })}
  </div>
</div>

  );
};

export default Requests;
