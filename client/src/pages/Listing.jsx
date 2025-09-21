import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaMapMarkerAlt, FaShare,FaBed,FaBath } from "react-icons/fa";
 

const Listing = () => {
  const [copied, setCopied] = useState(false);
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  const fetchListing = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(
        `http://localhost:3000/list/get/${params.id}`
      );
      if (res.data.success) {
        setListing(res.data.listing);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <p className="text-slate-700 text-center text-xl mt-2 font-semibold">
          Loading...
        </p>
      ) : (
        ""
      )}
      {error ? (
        <p className="text-red-700 text-center mt-2 ">Something went wrong!</p>
      ) : (
        ""
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] "
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed bg-slate-100 top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center cursor-pointer">
            <FaShare
              className=" text-slate-500  "
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link Copied{" "}
            </p>
          )}

          <div className="flex flex-col max-w-4xl max-auto p-3 my-7 gap-6">
            <p className="text-2xl font-semibold">
              {listing.name} - ${" "}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US").replace()
                : listing.regularPrice.toLocaleString("en-US").replace()}
              {listing.type === "rent" ? "/month" : ""}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm">
              <FaMapMarkerAlt
                className="text-green-700
                  "
              />
              {listing.address}
            </p>
            <div className=" flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
          </div>
          <p className="text-slate-800">
            <span className="font-semibold text-black ">Description - </span>

            {listing.description}
          </p>
          <ul className="text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 ">
            <li className="flex items-center gap-1 whitespace-nowrap">
              <FaBed className="text-lg"/>
              {
                listing.bedrooms >1 ? `${listing.bedrooms} beds`: `${listing.bedrooms} bed`
              }
            </li>
             <li className="flex items-center gap-1 whitespace-nowrap">
              <FaBath className="text-lg"/>
              {
                listing.bathrooms >1 ? `${listing.bathrooms} bath`: `${listing.bedrooms} bath`
              }
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Listing;
