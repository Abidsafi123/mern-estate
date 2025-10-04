import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      {/* Animated Heading */}
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}   // start invisible & above
        animate={{ opacity: 1, y: 0 }}      // fade in & slide down
        transition={{ duration: 1, ease: "easeOut" }}
      >
        About Abid Estate
      </motion.h1>

      <p className="mb-4">
        Welcome to <span className="font-semibold">Abid Estate</span>, your trusted partner in real estate solutions. 
        We are committed to helping you find the perfect property, whether you are 
        looking to buy, sell, or rent.
      </p>
      <p className="mb-4">
        With years of experience in the property market, we understand that 
        real estate is more than just buildings—it’s about creating spaces where 
        memories are made and futures are built. Our team works tirelessly to 
        provide honest guidance, transparent dealings, and the best opportunities 
        tailored to your needs.
      </p>
      <p className="mb-4">
        At Abid Estate, we believe in building long-term relationships with our 
        clients. That’s why we focus on trust, reliability, and satisfaction 
        above everything else. From residential homes and luxury apartments to 
        commercial properties, we cover a wide range of real estate options 
        to suit every requirement.
      </p>
      <p className="mb-4">
        Our mission is simple: <span className="italic">to make property dealing 
        easier, faster, and stress-free for everyone.</span> With a customer-first 
        approach and modern real estate practices, we continue to redefine the 
        property experience.
      </p>

      <motion.p
        className="text-center font-medium mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Abid Estate – Turning your property dreams into reality.
      </motion.p>
    </div>
  );
};

export default About;
