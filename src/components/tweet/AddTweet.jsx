import { useState } from "react";
import { useNavigate } from "react-router";
import { updateData } from "../utils";

function AddTweet() {
  document.title = 'VideoTube - Add tweet'
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
      let data = await updateData("tweet", { content });
      if (data) {
        navigate("/tweet");
      }
  };
  return (
    <div className="flex-center pt-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Add Tweet</legend>

          <label className="label">Content</label>
          <textarea
            type="text"
            className="textarea"
            placeholder="Write your tweet here..."
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          />

          <button className="btn btn-neutral mt-4" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default AddTweet;
