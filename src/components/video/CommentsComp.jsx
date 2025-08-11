import { updateData } from "../utils";

function CommentsComp({ comments,setComments }) {
  const currentDate = (d) => {
    const date = new Date(d);
    return date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
  };

  const updateLike = async (id) => {
    let data = await updateData(`like/comment`, {
      id
    });
    if (data) {
      setComments((prev)=>(prev.map((comment)=> comment._id === id ? {...comment,likes:data.likes} :comment)));
    }
  };

  return (
    <div>
      {comments?.length !== 0 ? (
        <ul className="list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most recent comments
          </li>

          {comments?.map((comment) => (
            <li className="list-row" key={comment._id}>
              <div>
                <img
                  className="size-10 rounded-box"
                  src={comment?.owner?.avatar}
                />
              </div>
              <div>
                <div>{comment?.owner?.fullname}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {`${currentDate(comment?.createdAt)}`}
                </div>
              </div>
              <p className="list-col-wrap text-xs">{comment?.content}</p>
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
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default CommentsComp;
