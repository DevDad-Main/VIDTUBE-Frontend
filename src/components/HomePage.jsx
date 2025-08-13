import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { fetchData } from "./utils";

function HomePage() {
  document.title = `Vidtube`;

  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    const data = await fetchData("api/v1/videos/feed?page=1&limit=10");
    if (data) {
      console.log(data);
      setVideos(data);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="flex-center flex-wrap gap-6 p-4">
      {videos?.map((video) => (
        <div key={video._id}>
          <div className="card bg-base-100 w-96 h-[400px] shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
            <NavLink to={`/video/${video._id}`} className="cursor-pointer">
              <figure>
                <div className="w-[600px] h-[250px]">
                  <img
                    src={video.thumbnail.url}
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
                    src={video.owner?.avatar?.url}
                    width={"60"}
                  />
                  <p>{video.owner?.username}</p>
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
