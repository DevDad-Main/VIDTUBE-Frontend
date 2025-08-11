import React, { useState } from "react";
import { useNavigate } from "react-router";
import { updateWithFormData } from "../utils";

function UpdateUserAvatar() {
  document.title = "VideoTube - Update account";

  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("avatar", avatar);
    const data = await updateWithFormData(
      "users/avatar",
      formDataToSend,
      { credentials: "include" },
      "PATCH"
    );

    if (data) {
      alert("Avatar updated successfully");
      navigate("/");
    }
  };
  return (
    <div className="flex-center py-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Update Avatar</legend>

          <label className="label">Avatar</label>
          <input
            type="file"
            className="file-input-info"
            placeholder="Name"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />

          <button type="submit" className="btn btn-sm">
            Update Avatar
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default UpdateUserAvatar;
