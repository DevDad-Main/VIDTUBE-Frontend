import { NavLink, useNavigate } from "react-router";
import { fetchData } from "./utils";
import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  const [user, setUser] = useState({});
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const searchRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside); // 🔄 was "mousedown"
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    async function getUser() {
      if (token) {
        const data = await fetchData("api/v1/users/current-user");
        if (data) {
          setUser(data);
        } else {
          sessionStorage.removeItem("token");
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }
    getUser();
  }, [navigate, token]);

  const letLogout = async () => {
    try {
      let data = await fetchData("api/v1/users/logout");
      if (data) {
        sessionStorage.clear();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 🔍 Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error(`Please enter a search query`, {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      setResults([]);
      setIsOpen(false);
      return;
    }
    try {
      const data = await fetchData(`api/v1/videos/search?query=${query}`);
      if (data && data.length > 0) {
        setResults(data);
        setIsOpen(true);
      } else {
        setResults(null);
        setIsOpen(false);
        toast.error(`No videos match your search`, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (err) {
      // console.error("Search failed", err);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md z-100">
      {/* Logo */}
      <NavLink to={"/"}>
        <span className="btn btn-ghost text-xl font-bold transition-transform duration-300 hover:scale-105 hover:shadow-sm">
          VIDTUBE
        </span>
      </NavLink>
      {/* 🔍 Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex-1 flex justify-center align-center"
      >
        {token && (
          <div className="relative w-1/2" ref={searchRef}>
            <input
              type="text"
              placeholder="Search videos..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!e.target.value.trim()) {
                  setResults([]);
                  setIsOpen(false);
                }
              }}
              className="input input-bordered w-full pr-12 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-1 -translate-y-1/2 btn btn-ghost rounded-full btn-sm btn-neutral"
            >
              Search
            </button>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
              <ul className="absolute bg-base-100 mt-2 w-full rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto border border-gray-200">
                {results.map((video) => (
                  <li
                    key={video._id}
                    className="flex items-center gap-5 p-2 hover:bg-base-200 cursor-pointer transition"
                    onClick={() => {
                      navigate(`/video/${video._id}`);
                      // window.location.reload();
                      setIsOpen(false);
                    }}
                  >
                    <img
                      src={video.thumbnail?.url}
                      alt={video.title}
                      className="w-25 h-20 object-cover rounded-md shadow-sm"
                    />
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-bold text-sm truncate">
                        {video.title}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {video.owner?.username}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </form>
      {token && (
        <div className="dropdown dropdown-end absolute right-3">
          {/* Avatar Button */}
          <div tabIndex={0} role="button" className="avatar cursor-pointer">
            <div className="border-2 border-white w-12 rounded-full hover:scale-105 transition">
              <img src={user?.avatar?.url} alt="User avatar" />
            </div>
          </div>

          {/* Dropdown Menu */}
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box w-56 p-2 shadow-lg z-50"
          >
            <li>
              <NavLink
                to={"/user"}
                onClick={(e) => e.target.closest(".dropdown").blur()}
              >
                👤 View Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/upload-video"}
                onClick={(e) => e.target.closest(".dropdown").blur()}
              >
                🎬 Create Video
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/watch-history"}
                onClick={(e) => e.target.closest(".dropdown").blur()}
              >
                ⏳ Watch History
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/playlists"}
                onClick={(e) => e.target.closest(".dropdown").blur()}
              >
                📂 Playlists
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/change-password"}
                onClick={(e) => e.target.closest(".dropdown").blur()}
              >
                🔑 Change Password
              </NavLink>
            </li>
            <li>
              <button
                onClick={() => {
                  letLogout();
                  document.activeElement.blur(); // force close after logout
                }}
              >
                🚪 Logout
              </button>
            </li>
          </ul>
        </div>
      )}{" "}
    </div>
  );
}

export default Header;
