import { useState } from "react";
import { updateData } from "../utils";
import { useNavigate } from "react-router";

function UpdatePlaylistModal({
  playlistId,
  playlistName,
  playlistDescription,
  onPlaylistUpdated,
}) {
  const [formData, setFormData] = useState({
    name: playlistName || "",
    description: playlistDescription || "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    document.getElementById(`my_modal_update_playlist_${playlistId}`)?.close();

    let data = await updateData(
      `api/v1/playlists/update/${playlistId}`,
      formData,
      "PATCH",
    );

    if (data && onPlaylistUpdated) {
      onPlaylistUpdated(data); // ✅ update state in parent
    }
  };

  return (
    <dialog id={`my_modal_update_playlist_${playlistId}`} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex-center flex-col">
          <form onSubmit={onSubmit}>
            <h1 className="fieldset-legend">Update Playlist</h1>
            <input
              type="text"
              className="input mb-2"
              placeholder="Playlist name"
              name="name"
              onChange={handleInput}
              value={formData.name}
            />
            <br />
            <textarea
              className="input"
              placeholder="Description"
              name="description"
              onChange={handleInput}
              value={formData.description}
            />
            <button className="mt-4 btn">Update</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
export default UpdatePlaylistModal;
