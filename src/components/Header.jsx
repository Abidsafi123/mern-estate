import React from "react";
import {FaSearch} from "react-icons/fa"
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div
        className="flex justify-between items-center mx-auto max-w-6xl p-3
  "
      >
        <Link to='/'>
        <h1 className="text-sm sm:text-xl flex flex-wrap font-bold ">
          <span className="text-slate-500">Safi</span>
          <span className="text-slate-700">Estate</span>
        </h1>
        </Link>
         <form className="bg-slate-100 p-3 rounded-lg flex items-center">
            <input type="text" placeholder="Search..." className="bg-transparent focus:outline-none w-24 sm:w-64 " />
            <FaSearch className="text-slate-600"/>
         </form>
         <ul className="flex gap-4">
           <Link to='/'>
            <li className=" cursor-pointer hidden sm:inline hover:underline text-slate-700 hover:text-slate-500 transition duration-1000">Home</li>
           </Link>
           <Link to='/about'>
            <li className=" cursor-pointer hidden sm:inline hover:underline text-slate-700 hover:text-slate-500 transition duration-1000">About</li>
           </Link>
           <Link to='/login'>
                       <li className=" cursor-pointer   hover:underline text-slate-700 hover:text-slate-500 transition duration-1000">Login</li>

           </Link>

         </ul>
      </div>
    </header>
  );
};

export default Header;
