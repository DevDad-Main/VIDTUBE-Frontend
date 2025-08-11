import React, { useEffect, useState } from "react";
import { fetchData, updateData } from "../utils";
import { NavLink } from "react-router";

function Tweet() {
  document.title = "VideoTube - Read tweets";

  const [tweets, setTweets] = useState([]);

  const fetchTweet = async () => {
    let data = await fetchData("tweet");
    if (data) {
      setTweets(data);
    }
  };

  const updateLike = async (id) => {
    let data = await updateData(`like/tweet`, {
      id,
    });
    if (data) {
      setTweets((prev) =>
        prev.map((tweet) =>
          tweet._id === id ? { ...tweet, likes: data.likes } : tweet
        )
      );
    }
  };

  useEffect(() => {
    fetchTweet();
  }, []);

  const handleDelete = async (id) => {
    let data = updateData("tweet", { id }, "DELETE");
    setTweets((prev) => prev.filter((tweet) => tweet._id !== id));
    console.log(data);
  };

  return (
    <div className="flex p-4 flex-wrap gap-4 relative">
      {tweets?.map((tweet) => (
        <div className="card bg-base-100 w-96 shadow-sm flex p-2">
          <div className="avatar relative">
            <NavLink
              to={`/profile/${tweet?.owner?.username}`}
              className="flex gap-1 items-center"
            >
              <div className="mask mask-squircle w-12">
                <img src={tweet?.owner?.avatar} />
              </div>
              <h2 className="card-title m-2">{tweet?.owner?.fullname}</h2>
            </NavLink>
            {tweet?.isOwner ? (
              <button
                className="btn btn-ghost absolute right-0 btn-error"
                onClick={() => {
                  handleDelete(tweet._id);
                }}
              >
                delete
              </button>
            ) : null}
          </div>
          <div className="card-body">
            <p className="text-lg font-sans">{tweet?.content}</p>
            <div className="card-actions justify-start">
              {/* <button className="btn btn-primary">Like</button> */}
              <button
                className="btn btn-square btn-ghost"
                onClick={() => {
                  updateLike(tweet._id);
                }}
              >
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </g>
                </svg>
                {tweet?.likes}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tweet;
