import { useState } from "react";
import { useNavigate } from "react-router";
import { updateData } from "../utils";
import { toast } from "react-toastify";
function ChangePassword() {
  document.title = "VideoTube - Change Password";

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log({ ...formData });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let data = await updateData("api/v1/users/change-password", {
      ...formData,
    });

    try {
      if (data) {
        alert("Password changed successfully");
        navigate("/");
      }
    } catch (err) {
      if (err.errors) {
        err.errors.forEach((error) => {
          toast.error(error.msg, {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
        });
      } else {
        toast.error("Something went wrong, please try again", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="flex-center pt-7">
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend">Change Password</legend>

          <label className="label">Old Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter old password!"
            name="oldPassword"
            onChange={handleInput}
            value={formData.oldPassword}
          />

          <label className="label">New Password</label>
          <input
            type="password"
            className="input"
            placeholder="Enter new password!"
            name="newPassword"
            onChange={handleInput}
            value={formData.newPassword}
          />

          <button className="btn btn-neutral mt-4" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default ChangePassword;
