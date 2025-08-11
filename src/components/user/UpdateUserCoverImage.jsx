import React, { useState } from "react";
import { useNavigate } from "react-router";
import { updateWithFormData } from "../utils";

function UpdateUserCoverImage() {
  document.title = "VideoTube - Update account";

  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("coverImage", coverImage);
    const data = await updateWithFormData(
      "api/v1/users/cover-image",
      formDataToSend,
      { credentials: "include" },
      "PATCH",
    );

    if (data) {
      alert("Cover Image updated successfully");
      navigate("/");
    }
  };
  return (
    <div className="flex-center py-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Update Cover Image</legend>

          <label className="label">Cover Image</label>
          <input
            type="file"
            className="file-input-info"
            placeholder="Name"
            name="avatar"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />

          <button type="submit" className="btn btn-sm">
            Update Cover Image
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default UpdateUserCoverImage;
