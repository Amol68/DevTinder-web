import axios from "axios";
import { setFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (Object.keys(feed).length === 0) {
        const userFeed = await axios.get(baseUrl + "/user/feed", {
          withCredentials: true,
        });

        dispatch(setFeed(userFeed.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-5">
        {/* <UserCard user={feed[13]} /> */}
      </div>
    )
  );
};

export default Feed;
