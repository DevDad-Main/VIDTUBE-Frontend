import { NavLink } from "react-router";
import { FaTrash } from "react-icons/fa";
import { updateData } from "../utils";

function VideoComp({ videos, title, playlistId, isOnProfile, onUpdate }) {
  let handleDeleteVideoFromPlaylist = async (videoId) => {
    try {
      let data = await updateData(
        `api/v1/playlists/remove-video/${playlistId}`,
        {
          videoId: videoId,
        },
        "DELETE",
      ); // Your backend delete route
      if (data) {
        onUpdate();
      }
    } catch (error) {
      console.error("Failed to delete playlist", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos?.map((video) => (
          <NavLink key={video?._id} to={`/video/${video?._id}`}>
            <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              {isOnProfile && (
                <button
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault(); // prevent NavLink click
                    handleDeleteVideoFromPlaylist(video._id);
                  }}
                >
                  Remove From Playlist
                </button>
              )}
              <img
                src={video?.thumbnail?.url}
                alt="thumbnail"
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <h4 className="text-sm font-medium">{video?.title}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {video?.views} {video?.views == 1 ? "view" : "views"}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default VideoComp;
