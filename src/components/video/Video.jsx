import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import CommentsComp from "./CommentsComp";
import { fetchData, updateData } from "../utils";
import { AddToPlaylistBtn } from "..";

function Video() {
  document.title = `VideoTube - Explore videos`;

  const { videoId = "1" } = useParams();
  const [videoFileUrl, setVideoFile] = useState();
  const [isOwner, setOwner] = useState(false);
  const [data, setData] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [sendComment, setSendComment] = useState();
  const navigate = useNavigate();

  const fetchVideo = async () => {
    let data = await fetchData(`api/v1/videos/${videoId}`);
    if (data) {
      console.log(data);
      setOwner(data.isOwner);
      setVideoFile(data._doc.videoFile?.url || "");
      setData(data._doc);
      setComments(data.comments);
      setLikes(data.likes);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  const updateComment = async (e) => {
    e.preventDefault();
    try {
      let data = await updateData(`api/v1/videos/comment/add/${videoId}`, {
        content: sendComment,
      });
      if (data) {
        setComments((prevComment) => [...prevComment, data]);
        setSendComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = () => {
    let data = updateData(`api/v1/videos/${videoId}`, {}, "DELETE");
    if (data) {
      console.log(data);
      alert("data deleted successfully");
      navigate("/");
    }
  };

  const updateLike = async () => {
    let data = await updateData(`api/v1/videos/like/video`, {
      id: videoId,
    });
    if (data) {
      setLikes(data.likes);
    }
  };

  return (
    <div className="p-4 pl-10">
      <div className="m-auto w-full">
        <div className="flex-center flex-col gap-5">
          {videoFileUrl && (
            <video
              className="w-full max-h-[80vh] object-contain"
              controls
              autoPlay
              name="media"
            >
              {/* <source src={`http://res.cloudinary.com/ddwgvjj4a/video/upload/v1749806055/gk3xv2l01nywgmifmlvl.mp4`} type="video/mp4" /> */}
              {/* <source src={data?.videoFile?.url} type="video/mp4" /> */}
              <source src={videoFileUrl} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="mt-3 flex justify-start items-center gap-4">
          <button className="btn">{data?.views} Views</button>
          <button
            className="btn"
            onClick={() => {
              updateLike();
            }}
          >
            {likes} Likes
          </button>
          <AddToPlaylistBtn id={data._id} />
          {isOwner ? (
            <button
              className="btn btn-error absolute right-1"
              onClick={deleteVideo}
            >
              Delete Video
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex justify-start items-start text-2xl font-semibold">
        {data.title}
      </div>
      <div className="flex justify-start items-start text-xl font-normal">
        {data?.description}
      </div>

      <div className="flex flex-row justify-between items-center">
        <div className="card-actions justify-start items-center">
          <NavLink
            to={`/profile/${data?.owner?.username}`}
            className="flex gap-2 items-center"
          >
            <img
              className="mask mask-circle"
              src={data?.owner?.avatar}
              width={"30"}
            />
            <p className="font-semibold">{data?.owner?.fullname}</p>
          </NavLink>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <CommentsComp comments={comments} setComments={setComments} />

        {/* <div className="flex-center w-1/2"> */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box sm:w-xl md:3xl w-7xl border p-4 ">
          <legend className="fieldset-legend">Comment</legend>
          <div className="join">
            <form onSubmit={updateComment}>
              <input
                type="text"
                className="input join-item sm:w-lg md:w-lg lg:w-xl w-5xl"
                placeholder="Product name"
                value={sendComment}
                onChange={(e) => setSendComment(e.target.value)}
              />
              <button className="btn join-item">save</button>
            </form>
          </div>
        </fieldset>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Video;
