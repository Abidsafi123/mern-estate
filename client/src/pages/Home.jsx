import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
 import SwiperCore from "swiper"
 import List from "../components/List"
 

const Home = () => {

  const [offerList, setOfferList] = useState([]);
  const [saleList, setSaleList] = useState([]);
  const [rentList, setRentList] = useState([]);
    SwiperCore.use([Navigation])

  const fetchListing = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/list/get?offer=true&limit=4`
      );
      if (res.data.success) {
        setOfferList(res.data.listings);
      }

      // fetch rent
      const rentRes = await axios.get(
        `http://localhost:3000/list/get?type=rent&limit=4`
      );
      if (rentRes.data.success) {
        setRentList(rentRes.data.listings);
      }

      // fetch sale
      const saleRes = await axios.get(
        `http://localhost:3000/list/get?type=sale&limit=4`
      );
      if (saleRes.data.success) {
        setSaleList(saleRes.data.listings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListing();
  }, []);

  return (
    <div>
      {/*top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br /> place
          with ease
        </h1>
        <div className="text-gray-400 tex-xs sm:text-sm">
          Safi Estate is the best place to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={`/search`}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started
        </Link>
      </div>
           {/* swiper */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {offerList && offerList.length > 0 &&
          offerList.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px] rounded-lg shadow-md"
              >
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>


      {/* OFFER LISTINGS */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerList && offerList.length >0 &&(
            <div className=" my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={`/search?offer=true`}>
              Show more offers
              </Link>
              <div className="flex flex-wrap gap-4"  >
          {
                  offerList.map((listing)=>(
                    <List listing = {listing} key={listing._id}/>
                  
                ))
          }
              </div>
            </div>
          )
        }
        {
          rentList && rentList.length >0 &&(
            <div className=" my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places for rent</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={`/search?type=rent`}>
              Show more offers
              </Link>
              <div className="flex flex-wrap gap-4"  >
          {
                  rentList.map((listing)=>(
                    <List listing = {listing} key={listing._id}/>
                  
                ))
          }
              </div>
            </div>
          )
        }
        {
        saleList && saleList.length >0 &&(
            <div className=" my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent Places for Sale</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={`/search?type=sale`}>
              Show more offers
              </Link>
              <div className="flex flex-wrap gap-4"  >
          {
                  saleList.map((listing)=>(
                    <List listing = {listing} key={listing._id}/>
                  
                ))
          }
              </div>
            </div>
          )
        }

      </div>
       
       
    </div>
  );
};

export default Home;
