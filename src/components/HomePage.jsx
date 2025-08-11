import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetchData } from "./utils";

function HomePage() {
  document.title = `VideoTube`

  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const data = await fetchData("videos/feed?page=1&limit=10");
    if (data) {
      setVideos(data.docs);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="flex-center flex-wrap gap-6 p-4">
      {videos.map((video) => (
        <div key={video._id}>
          <div className="card bg-base-100 w-96 h-[400px] shadow-sm">
            <NavLink to={`/video/${video._id}`} className="cursor-pointer">
              <figure>
                <div className="w-[600px] h-[250px]">
                  <img
                    src={video.thumbnail}
                    alt="Shoes"
                    className="w-[600px] h-[250px] object-cover rounded-t-lg"
                  />
                </div>
              </figure>

              <div className="card-body">
                <h2 className="card-title">{video.title}</h2>
                <p>{video.description}</p>
                <div className="card-actions justify-start items-center">
                  <img
                    className="mask mask-circle"
                    src={video?.owner?.avatar}
                    width={"30"}
                  />
                  <p>{video?.owner?.fullname}</p>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
