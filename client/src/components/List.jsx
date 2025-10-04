import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const List = ({ listing }) => {
  // ✅ Calculate discount %
  const discountPercent =
    listing.offer && listing.regularPrice
      ? Math.round(
          ((listing.regularPrice - listing.discountPrice) /
            listing.regularPrice) *
            100
        )
      : null;

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

          {/* Price + Discount */}
          <p className="font-semibold text-slate-700 flex items-center gap-2">
            {listing.offer
              ? `$${listing.discountPrice.toLocaleString("en-US")}`
              : `$${listing.regularPrice.toLocaleString("en-US")}`}
            {listing.type === "rent" && " / month"}

            {discountPercent && (
              <span className="text-green-600 text-sm font-medium">
                ({discountPercent}% OFF)
              </span>
            )}
          </p>

          {/* Features */}
          <div className="flex gap-4 text-sm text-gray-600 mt-2">
            <span>
              {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </span>
            <span>
              {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </span>
            {listing.parking && <span>Parking</span>}
            {listing.furnished && <span>Furnished</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default List;
