import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const List = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg">
      <Link to={`/listing/${listing._id}`}>
        {/* Cover Image */}
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
          src={listing.imageUrl[0]}
          alt="listing_cover"
        />

        {/* Content */}
        <div className="p-3 flex flex-col gap-2 w-full">
          {/* Title */}
          <p className="truncate text-lg font-semibold text-slate-700 w-full sm:w-[330px]">
            {listing.name}
          </p>

          {/* Address */}
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate">{listing.address}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 truncate">
            {listing.description}
          </p>

          {/* Price */}
          <p className="font-semibold text-slate-700">
            {listing.offer
              ? `$${listing.discountPrice.toLocaleString("en-US")}`
              : `$${listing.regularPrice.toLocaleString("en-US")}`}
            {listing.type === "rent" && " / month"}
          </p>

          {/* Features */}
          <div className="flex gap-4 text-sm text-gray-600 mt-2">
            <span className="font-semibold text-slate-700">
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </span>
            <span className="font-semibold text-slate-700">
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </span>
            {listing.parking && <span className="font-semibold">Parking</span>}
            {listing.furnished && <span className="font-semibold">Furnished</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default List;
