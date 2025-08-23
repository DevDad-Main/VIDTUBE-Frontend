import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetchData } from "./utils";

function HomePage() {
  document.title = `Vidtube`;

  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // default per-page
  const user = sessionStorage.getItem("token");
  const [hasMore, setHasMore] = useState(true); // track if there are more videos
  const isLoggedIn = !!user;

  const fetchVideos = async (pageNum) => {
    try {
      const data = await fetchData(
        `api/v1/videos/feed?page=${pageNum}&limit=${limit}`,
      );
      if (data) {
        console.log(data);
        setVideos(data.videos);
        setHasMore(data.currentPage < data.totalPages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return (
    <div className="flex flex-col items-center">
      {/* Video Grid */}
      <div className="flex-center flex-wrap gap-6 p-4">
        {videos?.map((video) => (
          <div key={video._id}>
            <div className="card bg-base-100 w-96 h-[400px] shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <NavLink to={`/video/${video._id}`} className="cursor-pointer">
                <figure>
                  <div className="w-[600px] h-[250px]">
                    <img
                      src={video.thumbnail.url}
                      alt={video.title}
                      className="w-[600px] h-[250px] object-cover rounded-t-lg"
                    />
                  </div>
                </figure>

                <div className="card-body">
                  <h2 className="card-title">{video.title}</h2>
                  <p className="line-clamp-2">{video.description}</p>
                  <div className="card-actions justify-start items-center">
                    <img
                      className="mask mask-circle"
                      src={video.owner?.avatar?.url}
                      width="60"
                    />
                    <p>{video.owner?.username}</p>
                  </div>
                </div>
              </NavLink>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination Controls */}
      {isLoggedIn && (
        <div className="flex gap-4 p-4">
          <button
            className="btn btn-primary"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="font-semibold">Page {page}</span>

          <button
            className="btn btn-primary"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
