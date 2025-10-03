import React, { useState } from "react";
import List from "./List";

const Lists = ({ listings }) => {
  const [visible, setVisible] = useState(7); // show first 7

  return (
    <div className="flex flex-col items-center">
      {/* Listings Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {listings.slice(0, visible).map((listing) => (
          <List key={listing._id} listing={listing} />
        ))}
      </div>

      {/* Show More Button */}
      {visible < listings.length && (
        <button
          onClick={() => setVisible((prev) => prev + 7)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default Lists;
