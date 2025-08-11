import { useEffect, useState } from "react";
import { fetchData } from "../utils";
import VideoComp from "../comps/VideoComp";

function UserWatchHistory() {
  document.title = "VideoTube - Watch history";

  const [videos, setVideos] = useState([]);
  const fetchVideo = async () => {
    let data = await fetchData("users/watch-history");
    if (data) {
      setVideos(data);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);
  return (videos.length > 0 ? (
    <VideoComp title="Watch history" videos={videos} />
  ) : null);
}

export default UserWatchHistory;
