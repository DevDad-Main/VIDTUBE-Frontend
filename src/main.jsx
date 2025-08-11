import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router";
import {
  Register,
  Login,
  HomePage,
  Video,
  UploadVideo,
  Tweet,
  AddTweet,
  UserProfile,
  Protected,
  UserWatchHistory,
  ChangePassword,
  UpdateUserAccount,
  UpdateUserAvatar,
  PlaylistPage,
  Playlist,
  UserDetails,
} from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route
        path=""
        element={
          <Protected>
            <HomePage />
          </Protected>
        }
      >
        {/* <Route path="" element={} /> */}
      </Route>
      <Route
        path="video/:videoId"
        element={
          <Protected>
            <Video />
          </Protected>
        }
      />
      <Route
        path="upload-video"
        element={
          <Protected>
            <UploadVideo />
          </Protected>
        }
      />
      <Route
        path="tweet"
        element={
          <Protected>
            <Tweet />
          </Protected>
        }
      />
      <Route
        path="add-tweet"
        element={
          <Protected>
            <AddTweet />
          </Protected>
        }
      />
      <Route
        path="profile/:username"
        element={
          <Protected>
            <UserProfile />
          </Protected>
        }
      />
      <Route
        path="watch-history"
        element={
          <Protected>
            <UserWatchHistory />
          </Protected>
        }
      />
      <Route
        path="change-password"
        element={
          <Protected>
            <ChangePassword />
          </Protected>
        }
      />
      <Route
        path="update-account"
        element={
          <Protected>
            <UpdateUserAccount />
          </Protected>
        }
      />
      <Route
        path="update-avatar"
        element={
          <Protected>
            <UpdateUserAvatar />
          </Protected>
        }
      />
      <Route
        path="playlists"
        element={
          <Protected>
            <PlaylistPage />
          </Protected>
        }
      />
      <Route
        path="playlist/:id"
        element={
          <Protected>
            <Playlist />
          </Protected>
        }
      />
      <Route
        path="user"
        element={
          <Protected>
            <UserDetails />
          </Protected>
        }
      />
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
