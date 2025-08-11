import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchData } from "../utils";
import VideoComp from "../comps/VideoComp";

function Playlist() {
  document.title = 'VideoTube - Playlists'

  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [title,setTitle] = useState('');

  const fetchPlaylist = async () => {
    let data = await fetchData(`playlist/v/${id}`);
    if (data) {
      setVideos(data.videos);
      setTitle(data.name)
    }
  };
  useEffect(() => {
    fetchPlaylist();
  }, []);
  
  return (
    <>
      <VideoComp videos={videos} title={title} />
    </>
  );
}

export default Playlist;
