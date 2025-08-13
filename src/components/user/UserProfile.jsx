import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchData } from "../utils";
import { NavLink } from "react-router";
import { updateData } from "../utils";

function UserProfile() {
  document.title = "VideoTube";

  const { username } = useParams();
  const [user, setUser] = useState({});
  const [userCoverImage, setCoverImage] = useState();

  const fetchProfile = async () => {
    let data = await fetchData(`api/v1/users/channel/${username}`);
    if (data) {
      console.log(data);
      setUser(data);
      setCoverImage(data.coverImage?.url);
    }
  };

  const letSubscribe = async (id) => {
    let data = await updateData("subscription", { channelId: id });
    if (data) {
      setUser((prev) => ({
        ...prev,
        ["isSubscribed"]: true,
        ["subscribersCount"]: prev.subscribersCount + 1,
      }));
    }
  };

  const letUnSubscribe = async (id) => {
    let data = await updateData("subscription", { channelId: id }, "DELETE");
    if (data) {
      setUser((prev) => ({
        ...prev,
        ["isSubscribed"]: false,
        ["subscribersCount"]: prev.subscribersCount - 1,
      }));
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="w-full">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="p-2 flex-center">
            <img
              src={user.avatar?.url}
              alt="avatar"
              className="border-4 border-white"
            />
          </div>
        </div>
      </dialog>

      {userCoverImage && (
        <>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div className="p-2 flex-center">
                <img
                  src={user.coverImage?.url}
                  alt="avatar"
                  className="border-4 border-white"
                />
              </div>
            </div>
          </dialog>
          <div
            className="h-48 md:h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${userCoverImage})` }}
            onClick={() => document.getElementById("my_modal_4").showModal()}
          />
        </>
      )}
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-start  gap-4">
        <img
          src={user.avatar?.url}
          alt="avatar"
          className="w-24 h-24 object-cover rounded-full border-4 border-white -mt-16 md:mt-0 md:-translate-y-12 cursor-pointer"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <div className="text-sm text-gray-600 flex gap-4 justify-center md:justify-start mt-1">
            <span>{user.subscribersCount} Subscribers</span>
            <span>{user.channelsSubscribedToCount} Subscribed</span>
          </div>
        </div>

        {user.isSubscribed ? (
          <button
            className="px-4 py-2 rounded-md btn"
            onClick={() => {
              letUnSubscribe(user?._id);
            }}
          >
            {" "}
            Unsubscribe
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-md btn"
            onClick={() => {
              letSubscribe(user?._id);
            }}
          >
            {" "}
            Subscribe
          </button>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <h3 className="text-xl font-semibold mb-4">Uploaded Videos</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {user?.videos?.map((video) => (
            <NavLink key={video?._id} to={`/video/${video?._id}`}>
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  src={video?.thumbnail.url}
                  alt="thumbnail"
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm font-medium">{video?.title}</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {video?.views} views
                  </p>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
