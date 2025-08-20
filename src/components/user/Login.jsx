import { useState } from "react";
import { useNavigate } from "react-router";
import { updateData } from "../utils";

function Login() {
  document.title = "VideoTube - Login";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  sessionStorage.clear();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log({...formData});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await updateData("api/v1/users/login", { ...formData });
    if (data) {
      sessionStorage.setItem("token", data?.accessToken);
      navigate("/");
    }
  };
  return (
    <div className="flex-center pt-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            placeholder="Username"
            name="username"
            onChange={handleInput}
            value={formData.username}
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

          <button className="btn btn-neutral mt-4" type="submit">
            Login
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
