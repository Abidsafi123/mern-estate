 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams,useNavigate } from "react-router-dom";

const CLOUD_NAME = "dg37tijbo";
const UPLOAD_PRESET = "image_preset";
const FOLDER_NAME = "listings";

const UpdateListing = () => {
  const [files, setFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 50,
    offer: false,
    parking: false,
    furnished: false,
  });

  // ✅ Handle Form Changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({ ...prev, type: id }));
    } else if (id === "furnished" || id === "parking" || id === "offer") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === "number" ? Number(value) : value,
      }));
    }
  };

  // ✅ Upload images to Cloudinary
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!files || files.length === 0)
      return setError("Please select at least one image!");
    if (files.length > 6) return setError("You can only upload up to 6 images");

    try {
      setUploading(true);
      const urls = [];

      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("file", files[i]);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("folder", FOLDER_NAME);

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          data
        );

        urls.push(res.data.secure_url);
      }

      setImageUrls(urls);
      setSuccess("✅ Images uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ✅ Delete Image from preview
  const handleDeleteImage = (index) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit Listing Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (imageUrls.length === 0) {
      return setError("Please upload at least one image!");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:3000/list/update/${params.id}`,
        {
          ...formData,
          imageUrl: imageUrls,
          userRef: currentUser._id,
        }
      );

      if (res.data.success) {
        console.log("Updated Listing:", res.data.listing);
        setSuccess("✅ Listing updated successfully!");
      } else {
        setError("Listing update failed!");
      }
    } catch (error) {
      console.error("Error updating listing:", error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch listing details
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/list/get/${params.id}`
        );
        console.log("Fetched listing:", res.data);

        if (res.data.success) {
          setFormData((prev) => ({
            ...prev,
            ...res.data.listing,
          }));

          if (res.data.listing.imageUrl) {
            setImageUrls(res.data.listing.imageUrl);
          }
        } else {
          setError(res.data.message || "Failed to fetch listing");
        }
      } catch (err) {
        console.error("Error fetching listing:", err);
        setError("Failed to fetch listing");
      }
    };

    fetchListing();
  }, [params.id]);

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        {/* Left side */}
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            type="text"
            id="name"
            value={formData?.name || ""}
            onChange={handleChange}
            placeholder="Name"
            className="border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            onChange={handleChange}
            value={formData?.description || ""}
          />

          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            onChange={handleChange}
            value={formData?.address || ""}
          />

          {/* Checkboxes */}
          <div className="flex gap-6 flex-wrap ">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span>Offer</span>
            </div>
          </div>

          {/* Numbers */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                onChange={handleChange}
                value={formData.bathrooms}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                onChange={handleChange}
                value={formData.regularPrice}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-sm">($/Month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2 ">
              <input
                type="number"
                id="discountPrice"
                required
                onChange={handleChange}
                value={formData.discountPrice}
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span className="text-sm">($/Month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex flex-col flex-1 gap-4 ">
          <p className="font-semibold">Images:</p>
          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>

          <div className="flex gap-4">
            <input
              type="file"
              onChange={(e) => setFiles(e.target.files)}
              accept="image/*"
              id="images"
              className="border border-gray-300 p-3 w-full rounded"
              multiple
            />
            <button
              type="button"
              className="text-green-600 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 p-3"
              onClick={handleImageSubmit}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>

          {/* Preview with delete button */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt="listing"
                    className="rounded-lg w-full h-40 object-cover"
                  />

                  {idx === 0 && (
                    <span className="absolute top-1 left-1 bg-black text-white text-xs px-2 py-1 rounded">
                      Cover
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => handleDeleteImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="p-3 bg-slate-700 uppercase text-white rounded-lg hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {loading ? "Updating Listing..." : "Update Listing"}
          </button>
          

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-sm">{success}</p>}
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
