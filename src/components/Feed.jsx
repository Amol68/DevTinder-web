import axios from "axios";
import { setFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "../utils/constants";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  console.log({ feed });
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (Object.keys(feed).length === 0) {
        const userFeed = await axios.get(baseUrl + "/feed", {
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

  if (!feed.length) return <h3>No Devs Found</h3>;

  return (
    <div className="flex flex-col justify-center items-center gap-2 py-2">
      {feed.length && <UserCard user={feed[2]} />}
    </div>
  );
};

export default Feed;
