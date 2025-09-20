import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteStart,
  deleteSuccess,
  deleteFailure,
  logout, // ✅ import logout
} from "../redux/user/User";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const Profile = () => {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fileUrl, setFileUrl] = useState(currentUser?.avatar || "");
  const [uploading, setUploading] = useState(false);
  const [updatemsg, setUpdatemsg] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const [listingError, setListingError] = useState(false);
  const [userListing, setUserListing] = useState([]);
  // ✅ Delete profile
  const handleDelete = async () => {
    try {
      dispatch(deleteStart());

      const res = await axios.delete(
        `http://localhost:3000/user/delete/${currentUser._id}`
      );

      dispatch(deleteSuccess(res.data));
      alert("Account deleted successfully ✅");
      navigate("/login", { replace: true });
    } catch (error) {
      dispatch(deleteFailure(error.response?.data?.message || error.message));
      console.error("Delete failed:", error);
    }
  };

  // ✅ Sign out
  const handleSignOut = () => {
    dispatch(logout()); // clear Redux state
    localStorage.removeItem("user"); // if stored
    navigate("/login");
  };

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
      const res = await fetch(`http://localhost:3000/user/${currentUser._id}`, {
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
      });

      const data = await res.json();
      dispatch(updateSuccess(data));
      setUpdatemsg(true);
    } catch (err) {
      dispatch(updateFailure(err.message));
      console.error("Update error:", err);
    } finally {
      setUpdating(false);
    }
  };
  // const handleShowListing = async () => {

  //   try {
  //     setListingError(false)
  //     const res = await axios.get(`http://localhost:3000/user/show/${currentUser._id}`)
  //     if(res.data.success ===false){
  //       setListingError(true)
  //       return

  //     }
  //     setUserListing(res.data)
  //   } catch (error) {
  //     setListingError(true);
  //   }
  // };
  const handleShowListing = async () => {
    try {
      setListingError(false);
      const res = await axios.get(
        `http://localhost:3000/user/show/${currentUser._id}`
      );

      if (res.data.success === false) {
        setListingError(true);
        return;
      }

      // ✅ save only the listings array
      setUserListing(res.data.listings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListingError(true);
    }
  };
  // //edit import axios from "axios";

  // const editListing = async (id, updateData) => {
  //   try {
  //     const res = await axios.put(
  //       `http://localhost:3000/list/update/${id}`, // ✅ use /list not /user if it's listing
  //       updateData
  //     );

  //     if (res.data.success) {
  //       console.log("✅ Listing updated:", res.data.listing);
  //       return res.data.listing; // return updated listing
  //     } else {
  //       console.error(" Failed to update listing:", res.data.message);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error(
  //       " Edit listing error:",
  //       error.response?.data?.message || error.message
  //     );
  //     throw error;
  //   }
  // };

  //Delete Listing
  const handleDeleteListing = async (listingId) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/list/remove/${listingId}`
      );

      if (res.data.success) {
        setUserListing((prev) => prev.filter((l) => l._id !== listingId));
        alert(res.data.message || "Listing deleted successfully ✅");
      } else {
        alert(res.data.message || "Failed to delete listing ❌");
      }
    } catch (error) {
      console.error("Delete listing error:", error);
      alert("Error deleting listing ❌");
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
        <Link
          to={"/create-listing"}
          className="bg-green-700 text-white p-3  rounded-lg  uppercase text-center hover:opacity-95"
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>

      {
        <p className="text-green-700">
          {updatemsg ? "User Updated Successfully" : ""}
        </p>
      }
      <button className="text-green-700 w-full " onClick={handleShowListing}>
        Show Listing
      </button>

      <p className="text-red-700 mt-5">
        {listingError ? "Error showing listing" : ""}
      </p>
      <h1 className="text-center mb-4 font-semibold text-2xl">Your Listings</h1>
      {userListing &&
        userListing.length > 0 &&
        userListing.map((listing) => (
          <div
            key={listing._id}
            className=" gap-4 border rounded-lg p-3 flex justify-between items-center"
          >
            {/* Show only the first image */}
            <Link to={`/listing/${listing._id}`}>
              <img
                className="h-16 w-16 object-contain "
                src={listing.imageUrl?.[0]}
                alt="listing cover"
              />
            </Link>
            <Link
              to={`/listing/${listing._id}`}
              className="text-slate-700 font-semibold hover:underline truncate flex-1"
            >
              <p>{listing.name}</p>
            </Link>

            <div className="flex flex-col items-center">
              <button
                className="text-red-700 uppercase"
                onClick={() => handleDeleteListing(listing._id)}
              >
                Delete
              </button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className="text-green-700">Edit</button>
              </Link>
             
            </div>
          </div>
        ))}
    </div>
  );
};

export default Profile;
