 import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/User";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser,error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fileUrl, setFileUrl] = useState(currentUser?.avatar || "");
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");

  // ✅ Cloudinary config
  const CLOUD_NAME = "dg37tijbo";
  const UPLOAD_PRESET = "image_preset";
  const FOLDER_NAME = "images";

  // ✅ Upload to Cloudinary
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", FOLDER_NAME);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      setFileUrl(res.data.secure_url);
      console.log("Uploaded Image URL:", res.data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    setUpdating(true);

    try {
      const res = await fetch(
        `http://localhost:3000/user/${currentUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            ...(password && { password }),
            avatar: fileUrl,
          }),
        }
      );

      const data = await res.json();
      dispatch(updateSuccess(data));
      alert("Profile updated successfully ✅");
    } catch (err) {
      dispatch(updateFailure(err.message));
      console.error("Update error:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />

        {/* Avatar with loader */}
        <div className="relative w-fit mx-auto">
          <img
            src={fileUrl || "/default-avatar.png"}
            alt="profile"
            className="rounded-full size-24 object-cover cursor-pointer self-center mt-2"
            onClick={() => fileRef.current.click()}
          />
          {uploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-full">
              <ClipLoader size={30} color="#000" />
            </div>
          )}
        </div>

        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="border p-3 rounded-lg"
        />

        {/* Update button with loader */}
        <button
          type="submit"
          disabled={updating || uploading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase flex items-center justify-center gap-2 hover:opacity-95 disabled:opacity-80"
        >
          {updating ? (
            <>
              <ClipLoader size={20} color="#fff" />
              Updating...
            </>
          ) : (
            "Update"
          )}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
        {
         <p className="text-red-700 text-sm mt-3">{error ?error :""}</p>
        }
      </div>
    </div>
  );
};

export default Profile;
