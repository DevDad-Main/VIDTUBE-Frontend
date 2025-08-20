import { useState } from "react";
import { useNavigate } from "react-router";
import { updateWithFormData } from "../utils";
import toast from "react-toastify";

function Register() {
  document.title = "VideoTube - Register";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullname: "",
    password: "",
    avatar: "",
    coverImage: "",
  });

  const handleInput = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(name, " : ", value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("fullname", formData.fullname);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar); // should be File
    formDataToSend.append("coverImage", formData.coverImage); // should be File

    try {
      const data = await updateWithFormData(
        "api/v1/users/register",
        formDataToSend,
      );

      if (data.success) {
        alert("User created successfully");
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        const backendErrors = err.response.data.errors;
        const newErrors = {};
        backendErrors.forEach((e) => {
          toast.error(`${e.field}: ${e.message}`);
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
  return (
    <div className="flex-center py-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Registeration form</legend>
          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            name="username"
            onChange={handleInput}
            value={formData.username}
          />
          <p className="label">Username should be unique!</p>

          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
            onChange={handleInput}
            value={formData.email}
          />
          <label className="label">Fullname</label>
          <input
            type="text"
            className="input"
            placeholder="Full Name"
            name="fullname"
            onChange={handleInput}
            value={formData.fullname}
          />
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            name="password"
            onChange={handleInput}
            value={formData.password}
          />
          <p className="label">Username should be unique!</p>
          <label className="label">Avatar</label>
          <input
            type="file"
            className="file-input-info"
            placeholder="Avatar"
            name="avatar"
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                avatar: e.target.files[0],
              }));
              console.log(e.target.files[0]);
            }}
          />
          <label className="label">Cover image</label>
          <input
            type="file"
            className="file-input-info"
            placeholder="Cover Image"
            name="coverImage"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                coverImage: e.target.files[0],
              }))
            }
          />
          <button type="submit" className="btn btn-sm">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
