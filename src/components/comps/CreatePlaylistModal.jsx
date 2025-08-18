import { useState } from "react";
import { updateData } from "../utils";
import { useNavigate } from "react-router";

function CreatePlaylistModal({ onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

    let data = await updateData("api/v1/playlists/create", {
      name: formData.name,
      description: formData.description,
    });

    if (data) {
      onUpdate();
      setFormData({ name: "", description: "" }); // reset form
    }
  };

  return (
    <dialog id="my_modal_create_playlist" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <div className="flex-center flex-col">
          <form onSubmit={onSubmit}>
            <h1 className="fieldset-legend">Create Playlist</h1>
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
            <button
              className="mt-4 btn"
              onClick={() =>
                document.getElementById("my_modal_create_playlist").close()
              }
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default CreatePlaylistModal;
