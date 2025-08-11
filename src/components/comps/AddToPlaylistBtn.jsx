import React, { useEffect, useState } from "react";
import { fetchData, updateData } from "../utils";
import { useNavigate } from "react-router";

function AddToPlaylist({ id }) {
  const [playlists, setPlaylists] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const navigate = useNavigate();
  const fetchPlaylists = async () => {
    const data = await fetchData(`playlist`);
    if (data) {
      setPlaylists(data);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log({ ...formData });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = await updateData("playlist/create", {
      name: formData.name,
      description: formData.description,
      videoId: id,
    });
    console.log("playlist created ::: ", data);
    document.getElementById("my_modal_3").close();
    navigate(`/playlist/${data._id}`);
  };
  let addVideoToPlaylist = async (name) => {
    let data = await updateData("playlist", { videoId: id, name: name });
    console.log(data);
  };

  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex-center flex-col">
            <form onSubmit={onSubmit}>
              <h1 className="fieldset-legend">Add new Playlist</h1>
              <input
                type="text"
                className="input"
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
              <button className="mt-4 btn">Add</button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="dropdown dropdown-bottom">
        <div tabIndex={0} role="button" className="btn m-1">
          {" "}
          Add to Playlist
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {playlists?.map((playlist) => (
            <li>
              <button
                className="btn btn-ghost"
                onClick={() => addVideoToPlaylist(playlist?.name)}
              >
                {playlist?.name}
              </button>
            </li>
          ))}
          <li>
            <button
              className="btn btn-ghost btn-success"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Create new playlist
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AddToPlaylist;
