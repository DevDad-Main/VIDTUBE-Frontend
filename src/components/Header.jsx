import { NavLink } from "react-router";
import { fetchData } from "./utils";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
function Header() {
  const navigate = useNavigate();
  let token = sessionStorage.getItem("token");
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      if (token) {
        console.log("header use effect runn");
        const data = await fetchData("users/current-user");
        if (data) {
          setUser(data);
        }
      }
    }
    getUser();
  }, [token]);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <NavLink to={"/"}>
        <span className="btn btn-ghost text-xl">VideoTube</span>
      </NavLink>
      <div className="flex gap-5 text-2xl">
        <div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              Videos
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <NavLink to={"/upload-video"}>Upload video</NavLink>
              </li>

              <li>
                <NavLink to={"/watch-history"}>Watch History</NavLink>
              </li>
              <li>
                <NavLink to={"/playlists"}>Explore Playlist</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              Tweet
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <NavLink to={"/tweet"}>Read tweets</NavLink>
              </li>
              <li>
                <NavLink to={"/add-tweet"}>Add tweet</NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost m-1">
              User
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <NavLink to={"/change-password"}>Change Password</NavLink>
              </li>
              {/* <li>
                <NavLink to={"/update-account"}>Update Account</NavLink>
              </li>
              <li>
                <NavLink to={"/update-avatar"}>Update Avatar</NavLink>
              </li> */}
            </ul>
          </div>
        </div>

        {token ? (
          <div className="absolute right-3">
            <NavLink to={`/user`}>
              <div className="avatar cursor-pointer">
                <div className="w-12 rounded-full">
                  <img src={user?.avatar} />
                </div>
              </div>
            </NavLink>
            {/* <button className="btn btn-neutral text-lg" onClick={letLogout}>Logout</button> */}
          </div>
        ) : (
          <div className="absolute right-3 flex gap-3">
            <div>
              <NavLink to={"/login"}>
                <button className="btn btn-neutral text-lg">Login</button>
              </NavLink>
            </div>
            <div>
              <NavLink to={"/register"}>
                <button className="btn btn-neutral text-lg">Register</button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
