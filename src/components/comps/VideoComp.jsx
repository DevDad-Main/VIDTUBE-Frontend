import { NavLink } from "react-router";

function VideoComp({ videos, title }) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos?.map((video) => (
          <NavLink key={video?._id} to={`/video/${video?._id}`}>
            <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <img
                src={video?.thumbnail?.url}
                alt="thumbnail"
                className="w-full h-36 object-cover"
              />
              <div className="p-3">
                <h4 className="text-sm font-medium">{video?.title}</h4>
                <p className="text-xs text-gray-500 mt-1">
                  {video?.views} {video?.views == 1 ? "view" : "views"}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default VideoComp;
