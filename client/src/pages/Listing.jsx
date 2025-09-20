 import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from "swiper/react"
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle"

const Listing = () => {
    SwiperCore.use([Navigation])
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
  },[params.id]);  

 
 return(
    <div> 
        {loading ? <p className="text-slate-700 text-center text-xl mt-2 font-semibold">Loading...</p>:""}
        {error ? <p className="text-red-700 text-center mt-2 ">Something went wrong!</p>:""}
        {
            listing && !loading && !error &&(
                <>
                <Swiper navigation>
                    {
                        listing.imageUrl.map((url)=>(
                            <SwiperSlide key={url}>
                                <div className="h-[550px]  " style={{background:`url(${url}) center no-repeat`}}>

                                </div>

                            </SwiperSlide>
                        ))
                    }

                </Swiper>
                </>
            )
        }
     </div>
 )
};

export default Listing;
