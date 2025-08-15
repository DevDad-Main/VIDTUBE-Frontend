import { useEffect, useState } from "react";
import { fetchData } from "../utils";
import { NavLink } from "react-router";

function PlaylistPage() {
  document.title = "VideoTube - Playlists";

  const [playlists, setPlaylists] = useState([]);
  let fetchPlaylist = async () => {
    let data = await fetchData(`api/v1/playlists/playlists`);
    if (data) {
      setPlaylists(data);
    }
  };
  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold mb-4">Playlists</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists?.map((playlist) => (
          <NavLink
            to={`/playlist/${playlist._id}`}
            key={playlist._id}
            className="group block border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Show first video's thumbnail as cover */}
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  playlist?.videos?.[0]?.thumbnail.url || "/placeholder.jpg"
                })`,
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold group-hover:text-red-600">
                {playlist.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {playlist.description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {playlist.videos?.length} videos
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
