import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import CommentsComp from "./CommentsComp";
import { fetchData, updateData } from "../utils";
import { AddToPlaylistBtn } from "..";
import { FaThumbsUp } from "react-icons/fa";

function Video() {
  document.title = `VideoTube - Explore videos`;

  const { videoId = "1" } = useParams();
  const [videoFileUrl, setVideoFile] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [data, setData] = useState({});
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [sendComment, setSendComment] = useState();
  const navigate = useNavigate();

  const fetchVideo = async () => {
    let data = await fetchData(`api/v1/videos/${videoId}`);
    if (data) {
      // console.log(data);
      setIsOwner(data.isOwner);
      setVideoFile(data._doc.videoFile?.url || "");
      setData(data._doc);
      // setComments(data.comments);
      setLikes(data._doc.likes);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        let data = await fetchData(`api/v1/comments/comments/${videoId}`);
        if (data) {
          console.log(data);
          setComments(data);
        }
        // setComments(data); // Set the state
      } catch (err) {
        console.log(err);
      }
    };
    fetchComments();
  }, [videoId]);

  useEffect(() => {
    fetchVideo();
  }, []);
  const updateComment = async (e) => {
    e.preventDefault();
    try {
      let data = await updateData(`api/v1/comments/add/${videoId}`, {
        content: sendComment,
      });
      if (data) {
        console.log(data);
        setComments((prevComment) => [...(prevComment || []), data]);
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
    let data = await updateData(`api/v1/likes/video/${videoId}`, {
      id: videoId,
    });
    if (data) {
      console.log("Like Route Data: ", data);
      setLikes(data._doc.likes);
    }
  };

  return (
    <>
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

          <div className="flex justify-start items-start text-2xl font-semibold pb-2 pt-4">
            {data.title}
          </div>
          <div className="flex justify-start items-start text-xl font-normal">
            {data?.description}
          </div>
          <div className="flex flex-row justify-between items-center mt-4">
            <div className="card-actions justify-start items-center">
              <NavLink
                to={`/profile/${data.owner?.username}`}
                className="flex gap-2 items-center"
              >
                <img
                  className="mask mask-circle"
                  src={data.owner?.avatar?.url}
                  width={"60"}
                />
                <p className="font-semibold">{data.owner?.username}</p>
              </NavLink>
            </div>
          </div>

          <div className="mt-3 flex justify-start items-center gap-4">
            <button className="btn">{data?.views} Views</button>
            <button
              className="btn flex items-center gap-2"
              onClick={() => {
                updateLike();
              }}
            >
              {likes}{" "}
              <FaThumbsUp
                className={`transition-colors duration-300 ${data.isLiked ? "text-white scale-110" : "text-gray-500 hover:text-gray-300"}`}
              />
            </button>
            <AddToPlaylistBtn id={data._id} />
            {isOwner ? (
              <button
                className="btn btn-error absolute right-3"
                onClick={deleteVideo}
              >
                Delete Video
              </button>
            ) : null}
          </div>
        </div>
        <div className="divider"></div>

        <div>
          <CommentsComp comments={comments} setComments={setComments} />

          {/* <div className="flex-center w-1/2"> */}
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl border p-4 mx-auto">
            <legend className="fieldset-legend">Comment</legend>
            <div className="join">
              <form onSubmit={updateComment}>
                <input
                  type="text"
                  className="input join-item w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
                  placeholder="Write your comment here..."
                  value={sendComment}
                  onChange={(e) => setSendComment(e.target.value)}
                />
                <button className="btn join-item">Save</button>
              </form>
            </div>
          </fieldset>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Video;
