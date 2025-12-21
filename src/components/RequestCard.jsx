import axios from "axios";
import defaultUser from "../assets/images/defaultUser.jpeg"
import { baseUrl } from "../utils/constants";
import { removeRequest } from "../utils/requestSlice";
import { useDispatch } from "react-redux";

const RequestCard = ({request}) => {

     const dispatch = useDispatch();

    const reviewRequest = async (status, _id) => {
    try {
     
      const res = await axios.post(
        baseUrl + "/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log({ res });
      dispatch(removeRequest(_id))
    } catch (err) {
      console.log({ err });
    }
  };
   const {firstName,lastName,photoUrl
,about} = request.fromUserID;
  return (
   <div
            key={request._id}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-700 bg-[#1f1f26] shadow-sm"
          >
            {/* User Image */}
            <img
              src={photoUrl || defaultUser}
              alt="User avatar"
              className="rounded-full w-16 h-16 object-cover"
            />

            {/* User Information */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white">
                {firstName + " " + lastName}
              </h3>
              <p className="text-sm text-gray-300">{about}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-lg btn btn-secondary text-white font-medium"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>

              <button
                className="px-4 py-2 rounded-lg btn btn-primary  hover:bg-purple-600 text-white font-medium"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
  )
}

export default RequestCard