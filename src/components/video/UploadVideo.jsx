import { useState } from "react";
import { useNavigate } from "react-router";
import { updateWithFormData } from "../utils";

function UploadVideo() {
  document.title = "VideoTube - Upload Videos";

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isPublished: true,
    video: "",
    thumbnail: "",
  });

  const handleInput = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, " : ", value);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("isPublished", formData.isPublished);
    formDataToSend.append("video", formData.video);
    formDataToSend.append("thumbnail", formData.thumbnail);

    console.log(formDataToSend);
    console.log(formData);
    const data = await updateWithFormData("videos/upload", formDataToSend, {
      credentials: "include",
    });
    setLoading(false);

    if (data) {
      navigate("/");
    }
  };

  return loading ? (
    <span className="loading loading-bars loading-xl"></span>
  ) : (
    <>
      <div className="flex-center py-7">
        <form onSubmit={onSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Upload Video</legend>

            <label className="label">Title</label>
            <input
              type="text"
              className="input"
              placeholder="Enter Title"
              name="title"
              onChange={handleInput}
              value={formData.title}
            />

            <label className="label">Description</label>
            <textarea
              className="input"
              placeholder="Description of video"
              name="description"
              onChange={handleInput}
              value={formData.description}
            />

            <label className="label">do you want to publish?</label>
            <select
              name="isPublished"
              onChange={handleInput}
              value={formData.isPublished}
              defaultValue={"true"}
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>

            <label className="label">Thumbnail</label>
            <input
              type="file"
              className="file-input-info"
              placeholder="Name"
              name="thumbnail"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  thumbnail: e.target.files[0],
                }));
                console.log(e.target.files[0]);
              }}
            />

            <label className="label">Cover image</label>
            <input
              type="file"
              className="file-input-info"
              placeholder="Name"
              name="video"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  video: e.target.files[0],
                }))
              }
            />

            <button type="submit" className="btn btn-sm">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default UploadVideo;
