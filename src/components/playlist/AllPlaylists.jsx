import { useEffect, useState } from "react";
import { fetchData, updateData } from "../utils";
import { NavLink } from "react-router";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import CreatePlaylistModal from "../comps/CreatePlaylistModal";
import UpdatePlaylistModal from "../comps/UpdatePlaylistModal";

function PlaylistPage() {
  document.title = "VideoTube - Playlists";

  const [playlists, setPlaylists] = useState([]);
  let fetchPlaylist = async () => {
    let data = await fetchData(`api/v1/playlists/playlists`);
    if (data) {
      setPlaylists(data);
    }
  };
  let handleDeletePlaylist = async (playlistId) => {
    try {
      let data = await updateData(
        `api/v1/playlists/delete/${playlistId}`,
        {},
        "DELETE",
      ); // Your backend delete route
      if (data) {
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId)); // Remove from UI
      }
    } catch (error) {
      console.error("Failed to delete playlist", error);
    }
  };
  let handleUpdatePlaylist = async (playlistId) => {
    try {
      let data = await updateData(
        `api/v1/playlists/update/${playlistId}`,
        {},
        "DELETE",
      ); // Your backend delete route
      if (data) {
        setPlaylists((prev) => prev.filter((p) => p._id !== playlistId)); // Remove from UI
      }
    } catch (error) {
      console.error("Failed to delete playlist", error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 ">
      <h3 className="text-xl font-semibold mb-6">
        Playlists
        <button
          className="text-lg absolute right-5 cursor-pointer rounded-lg bg-gray-800 px-2 py-2 mx-auto shadow-lg hover:text-gray-400"
          onClick={() =>
            document.getElementById("my_modal_create_playlist").showModal()
          }
        >
          <FaPlus />
        </button>
        <CreatePlaylistModal />
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {playlists?.map((playlist) => (
          <div
            key={playlist._id}
            className="group relative block border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            {/* Edit button */}
            <button
              onClick={() => {
                document
                  .getElementById(`my_modal_update_playlist_${playlist._id}`)
                  .showModal();
              }}
              className="absolute top-2 right-9 p-1 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition"
            >
              <FaEdit size={14} />
            </button>

            <UpdatePlaylistModal
              playlistId={playlist._id}
              playlistName={playlist.name}
              playlistDescription={playlist.description}
              onPlaylistUpdated={(updated) => {
                setPlaylists((prev) =>
                  prev.map((p) =>
                    p._id === updated._id ? { ...p, ...updated } : p,
                  ),
                );
              }}
            />

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.preventDefault(); // prevent NavLink click
                handleDeletePlaylist(playlist._id);
              }}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
            >
              <FaTrash size={14} />
            </button>

            {/* NavLink for clicking to go to playlist */}
            <NavLink to={`/playlist/${playlist._id}`} className="block">
              <div
                className="h-40 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${
                    playlist?.videos?.[0]?.thumbnail?.url || "/placeholder.jpg"
                  })`,
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold group-hover:text-gray-400">
                  {playlist.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {playlist.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {playlist.videos?.length}{" "}
                  {playlist.videos?.length === 1 ? "video" : "videos"}
                </p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;
