import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import List from "../components/List";

const Search = () => {
  const [sidebarData, setsideBarData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "createdAt",
    order: "desc",
  });
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [showAll, setShowAll] = useState(false); // ✅ state for show more
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { id, value, checked } = e.target;

    if (id === "searchTerm") {
      setsideBarData((prev) => ({ ...prev, searchTerm: value }));
    }

    if (id === "all" || id === "rent" || id === "sale") {
      setsideBarData((prev) => ({ ...prev, type: id }));
    }

    if (id === "parking" || id === "furnished" || id === "offer") {
      setsideBarData((prev) => ({ ...prev, [id]: checked }));
    }

    if (id === "sort_order") {
      const sort = value.split("_")[0] || "createdAt";
      const order = value.split("_")[1] || "desc";
      setsideBarData((prev) => ({ ...prev, sort, order }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    urlParams.set("parking", sidebarData.parking);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setShowAll(false); // reset on new search
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromurl = urlParams.get("searchTerm");
    const typeOfFromurl = urlParams.get("type");
    const parkingFromurl = urlParams.get("parking");
    const offerFromurl = urlParams.get("offer");
    const furnishedFromurl = urlParams.get("furnished");
    const sortFromurl = urlParams.get("sort");
    const orderFromurl = urlParams.get("order");

    if (
      searchTermFromurl ||
      typeOfFromurl ||
      offerFromurl ||
      parkingFromurl ||
      orderFromurl ||
      furnishedFromurl ||
      sortFromurl
    ) {
      setsideBarData({
        searchTerm: searchTermFromurl || "",
        type: typeOfFromurl || "all",
        offer: offerFromurl === "true",
        parking: parkingFromurl === "true",
        order: orderFromurl || "desc",
        furnished: furnishedFromurl === "true",
        sort: sortFromurl || "createdAt",
      });
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await axios.get(
          `http://localhost:3000/list/get?${searchQuery}`
        );
        if (res.data.success) {
          setListing(res.data.listings);
        } else {
          setListing([]);
        }
      } catch (err) {
        console.error(err);
        setListing([]);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [location.search]);

  // ✅ Slice listings for show more feature
  const displayedListings = showAll ? listing : listing.slice(0, 7);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
          {/* Search term */}
          <div className="flex items-center gap-2 ">
            <label className="whitespace-nowrap font-semibold ">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search"
              value={sidebarData.searchTerm}
              onChange={handleChange}
              className="border rounded-lg p-3 w-full "
            />
          </div>

          {/* ... rest of your form unchanged ... */}
        </form>
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Result:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && listing.length === 0 && (
            <p className="text-xl text-slate-700 ">No Listing found!</p>
          )}
          {loading && (
            <p className="text-center text-slate-700 w-full ">Loading...</p>
          )}
          {!loading &&
            displayedListings.length > 0 &&
            displayedListings.map((item) => (
              <List key={item._id} listing={item} />
            ))}
        </div>

        {/* ✅ Show More button */}
        {!loading && listing.length > 7 && !showAll && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Show More
            </button>
          </div>
        )}

        {/* ✅ Optional: Show Less */}
        {showAll && listing.length > 7 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition"
            >
              Show Less
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
