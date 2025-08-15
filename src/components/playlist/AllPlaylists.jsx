import { useEffect, useState } from "react";
import { fetchData } from "../utils";
import { NavLink } from "react-router";
import { FaPlus } from "react-icons/fa";

function PlaylistPage() {
  document.title = "VideoTube - Playlists";

  const [playlists, setPlaylists] = useState([]);
  let fetchPlaylist = async () => {
    let data = await fetchData(`api/v1/playlists/playlists`);
    if (data) {
      setPlaylists(data);
    }
  };

  // let createPlaylist = async () => {
  //   // let data = await
  // };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 ">
      <h3 className="text-xl font-semibold mb-6">
        Playlists
        <button
          className="text-lg absolute right-5 cursor-pointer rounded-lg bg-gray-800 px-2 py-2 mx-auto shadow-lg hover:text-gray-400"
          onClick={() => alert("Test")}
        >
          <FaPlus />
        </button>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {playlists?.map((playlist) => (
          <NavLink
            to={`/playlist/${playlist._id}`}
            key={playlist._id}
            className="group block border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Show first video's thumbnail as cover */}
            <div
              className="h-40 bg-cover bg-center "
              style={{
                backgroundImage: `url(${
                  playlist?.videos?.[0]?.thumbnail?.url || "/placeholder.jpg"
                })`,
              }}
            />
            <div className="p-4 ">
              <h3 className="text-lg font-semibold group-hover:text-gray-400">
                {playlist.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {playlist.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {playlist.videos?.length}{" "}
                {playlist.videos?.length == 1 ? "video" : "videos"}
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
