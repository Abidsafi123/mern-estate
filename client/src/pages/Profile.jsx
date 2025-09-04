 import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentUser.avatar);
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false); // ✅ loader for update button

  // Cloudinary credentials
  const CLOUD_NAME = "dg37tijbo";
  const UPLOAD_PRESET = "image_preset";
  const FOLDER_NAME = "images";

  // ✅ Upload to Cloudinary
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", FOLDER_NAME);

      try {
        setLoading(true);
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        setImageUrl(res.data.secure_url);
        console.log("Uploaded Image URL:", res.data.secure_url);
      } catch (err) {
        console.error("Upload failed:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // ✅ Update profile in backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
      avatar: imageUrl,
    };

    try {
      setUpdating(true);
      const res = await axios.put(
        `http://localhost:3000/user/${currentUser._id}`, // adjust API URL
        updatedData
      );

      console.log("Update Response:", res.data);
      alert("Profile Updated ✅");
    } catch (error) {
      console.error("Update Failed:", error);
      alert("Update failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Hidden file input */}
        <input
          type="file"
          hidden
          accept="image/*"
          ref={fileRef}
          onChange={handleFileChange}
        />

        {/* Profile Image with Loader */}
        <div className="relative w-24 h-24 self-center mt-2">
          {loading ? (
            <div className="flex items-center justify-center w-24 h-24">
              <ClipLoader color="#2563eb" size={40} />
            </div>
          ) : (
            <img
              src={imageUrl}
              alt="profile"
              className="rounded-full w-24 h-24 object-cover cursor-pointer"
              onClick={() => fileRef.current.click()}
            />
          )}
        </div>

        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        
        <button
          type="submit"
          className="bg-slate-700 p-3 uppercase hover:opacity-95 text-white rounded-lg flex items-center justify-center"
          disabled={updating}
        >
          {updating ? (
            <ClipLoader color="#fff" size={20} />
          ) : (
            "Update"
          )}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
