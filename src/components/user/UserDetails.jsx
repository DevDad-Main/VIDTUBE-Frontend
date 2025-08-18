import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Camera, X, PencilLine, SaveIcon } from "lucide-react";
import { PlaylistPage, UserWatchHistory } from "../index";
import { fetchData, updateWithFormData, updateData } from "../utils";
import { useNavigate } from "react-router";

function UserDetails() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // getting user
  const [user, setUser] = useState({});
  async function getUser() {
    const data = await fetchData("api/v1/users/current-user");
    if (data) {
      setUser(data);
      console.log(data);
      console.log(`Cover Image is: ${data.coverImage?.url}`);
      console.log(`Avatar Image is: ${data.avatar?.url}`);
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateUserInfo = async () => {
    if (avatar) {
      const formDataToSend = new FormData();
      formDataToSend.append("avatar", avatar);
      console.log(avatar);
      console.log(formDataToSend);
      console.log(formData);
      await updateWithFormData(
        "api/v1/users/avatar",
        formDataToSend,
        { credentials: "include" },
        "PATCH",
      );
    }

    if (coverImage) {
      const formDataToSend = new FormData();
      formDataToSend.append("coverImage", coverImage);
      console.log(coverImage);
      console.log(formDataToSend);
      console.log(formData);
      await updateWithFormData(
        "api/v1/users/cover-image",
        formDataToSend,
        { credentials: "include" },
        "PATCH",
      );
    }
    if (formData.fullname && formData.email) {
      await updateData("api/v1/users/update-account", { ...formData }, "PATCH");
    }
    await getUser();
    setLoading(false);
    setEditing(false);
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      setAvatar(e.target.files[0]);
    };
    input.click();
  };

  const handleFileCoverImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      setCoverImage(e.target.files[0]);
    };
    input.click();
  };

  const letLogout = async () => {
    try {
      let data = await fetchData("api/v1/users/logout");
      if (data) {
        sessionStorage.clear();
        navigate("/login");
      } else {
        alert("You need to be logged in to access this page!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative">
        <img
          src={user.coverImage?.url}
          alt="cover image"
          className="w-full max-h-[400px] object-cover"
          style={{ objectPosition: "center top" }}
        />

        {editing && (
          <div
            className="absolute right-2 bottom-2 bg-blue-500 text-white rounded-4xl h-8 w-8 flex-center cursor-pointer"
            onClick={handleFileCoverImageUpload}
          >
            <Camera size={20} />
          </div>
        )}

        {/* Avatar wrapper */}
        <div className="absolute left-8 -bottom-16">
          <div className="avatar relative">
            <div className="w-36 h-36 rounded-full border-4 border-white overflow-hidden shadow-lg">
              <img src={user?.avatar?.url} alt="avatar" />
            </div>

            {editing && (
              <div
                className="absolute right-1 bottom-4 bg-blue-500 text-white rounded-4xl h-8 w-8 flex-center cursor-pointer"
                onClick={handleFileUpload}
              >
                <Camera size={20} />
              </div>
            )}
          </div>
        </div>
        <div className="absolute left-50 -bottom-10">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <div className="text-sm text-gray-600 flex gap-4 justify-center md:justify-start mt-1">
              <span>{user.subscribersCount} Subscribers</span>
              <span>{user.channelsSubscribedToCount} Subscribed</span>
            </div>
          </div>
        </div>

        {/* <div className="absolute left-50 -bottom-10"> */}
        {/*   <h1 className="text-3xl">{user?.username}</h1> */}
        {/* </div> */}
      </div>

      <div className="relative">
        <div className="absolute top-1 right-50">
          {editing ? (
            <>
              <button
                className="btn btn-soft btn-neutral m-2"
                onClick={() => {
                  setLoading(true);
                  updateUserInfo();
                }}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <SaveIcon size={20} />
                )}
                Save
              </button>
              <button
                className="btn btn-soft btn-secondary"
                onClick={() => setEditing(false)}
              >
                {" "}
                <X size={20} /> Cancel{" "}
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-soft btn-primary m-2"
                onClick={() => {
                  setEditing(true);
                  console.log(document.getElementById("fullname"));
                }}
              >
                {" "}
                <PencilLine size={20} /> Edit{" "}
              </button>
              <button className="btn btn-soft btn-error" onClick={letLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* <div className="flex-center w-[900px] mt-10"> */}
      {/*   <form className="flex flex-col gap-8"> */}
      {/*     <div> */}
      {/*       <label htmlFor="" className="font-sans text-lg"> */}
      {/*         Fullname */}
      {/*       </label> */}
      {/*       <br /> */}
      {/*       {editing ? ( */}
      {/*         <input */}
      {/*           type="text" */}
      {/*           name="fullname" */}
      {/*           value={formData.fullname} */}
      {/*           onChange={handleInput} */}
      {/*           className="font-semibold input w-[300px]" */}
      {/*         /> */}
      {/*       ) : ( */}
      {/*         <input */}
      {/*           type="text" */}
      {/*           name="" */}
      {/*           id="" */}
      {/*           value={user.fullname} */}
      {/*           className="font-semibold input w-[300px]" */}
      {/*           readOnly */}
      {/*         /> */}
      {/*       )} */}
      {/*     </div> */}
      {/* <div> */}
      {/*   <label htmlFor="" className="font-sans text-lg"> */}
      {/*     Email */}
      {/*   </label> */}
      {/*   <br /> */}
      {/*   {editing ? ( */}
      {/*     <input */}
      {/*       type="text" */}
      {/*       name="email" */}
      {/*       value={formData.email} */}
      {/*       onChange={handleInput} */}
      {/*       className="font-semibold input w-[300px]" */}
      {/*     /> */}
      {/*   ) : ( */}
      {/*     <input */}
      {/*       type="text" */}
      {/*       name="" */}
      {/*       id="" */}
      {/*       value={user.email} */}
      {/*       className="font-semibold input w-[300px]" */}
      {/*       readOnly */}
      {/*     /> */}
      {/*   )} */}
      {/* </div> */}
      {/* </form> */}
      {/* </div> */}

      <div className="mt-10">
        <UserWatchHistory />
      </div>
      <div className="mt-10">
        <PlaylistPage />
      </div>
    </div>
  );
}

export default UserDetails;
