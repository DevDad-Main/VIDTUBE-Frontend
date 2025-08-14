import { updateData } from "../utils";
// import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";

function CommentsComp({ comments, setComments }) {
  const [openMenu, setOpenMenu] = useState();

  const currentDate = (d) => {
    const date = new Date(d);
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  };

  const updateLike = async (id) => {
    let data = await updateData(`like/comment`, {
      id,
    });
    if (data) {
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? { ...comment, likes: data.likes } : comment,
        ),
      );
    }
  };

  // const deleteVideo = () => {
  //   let data = updateData(`api/v1/videos/${videoId}`, {}, "DELETE");
  //   if (data) {
  //     console.log(data);
  //     alert("data deleted successfully");
  //     navigate("/");
  //   }
  // };
  const deleteComment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;

    try {
      const data = updateData(
        `api/v1/comments/delete/${id}`,
        { id: id },
        "DELETE",
      );

      if (data) {
        console.log(data);
        // Remove the deleted comment from state
        setComments((prev) => prev.filter((comment) => comment._id !== id));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {comments?.length !== 0 ? (
        <ul className="space-y-4">
          {" "}
          {/* spacing between bubbles */}
          <li className="p-2 text-xs opacity-60 tracking-wide">
            Most recent comments
          </li>
          {comments?.map((comment) => (
            <li
              key={comment._id}
              className="flex items-start gap-3 bg-base-200 p-3 rounded-xl shadow-lg"
            >
              {/* Avatar */}
              <img
                className="size-10 rounded-full"
                src={comment?.owner?.avatar?.url}
                alt={comment?.owner?.username}
              />

              {/* Bubble Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    {comment?.owner?.username}
                  </span>
                  <span className="text-xs uppercase font-semibold opacity-60">
                    {currentDate(comment?.createdAt)}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment?.content}</p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 ml-auto">
                <button
                  className="btn btn-square btn-ghost"
                  onClick={() => {
                    updateLike(comment._id);
                  }}
                >
                  <svg
                    className="size-[1.2em]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </g>
                  </svg>
                  {comment?.likes}
                </button>

                {/* Actions */}
                <div className="relative ml-auto">
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() =>
                      setOpenMenu(openMenu === comment._id ? null : comment._id)
                    }
                  >
                    <FaEllipsisV />
                  </button>

                  {/* Dropdown */}
                  {openMenu === comment._id && (
                    <div className="absolute right-0 mt-2 w-32 bg-base-100 rounded-lg shadow-lg border z-50">
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-base-200 text-sm"
                        onClick={() => {
                          editComment(comment._id);
                          setOpenMenu(null);
                        }}
                      >
                        <FaEdit className="text-blue-500" /> Edit
                      </button>
                      <button
                        className="flex items-center gap-2 w-full px-3 py-2 hover:bg-base-200 text-sm text-red-500"
                        onClick={() => {
                          deleteComment(comment._id);
                          setOpenMenu(null);
                        }}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CommentsComp;
