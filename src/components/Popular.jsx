// PopularHotels.jsx
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

const popularHotels = [
  {
    name: "Majestic Stay",
    avg_rating: 9.5,
    location: "South Delhi",
    image: "./hotel1.jpg",
  },
  {
    name: "The Neem",
    avg_rating: 9.4,
    location: "Greater Kailash 1",
    image: "./hotel2.jpg",
  },
  {
    name: "Hotel Cosmo",
    avg_rating: 9.3,
    location: "Karol Bagh",
    image: "./hotel3.jpg",
  },
  {
    name: "J House near Bhikaji",
    avg_rating: 9.3,
    location: "South Delhi",
    image: "./hotel4.jpg",
  },
  {
    name: "FabHotel Royal Comfort Castle",
    avg_rating: 9.1,
    location: "South Delhi",
    image: "./hotel5.jpg",
  },
  {
    name: "Hotel Red Castle",
    avg_rating: 8.9,
    location: "Karol Bagh",
    image: "./hotel6.jpg",
  },
  {
    name: "Hotel Park Suites",
    avg_rating: 8.9,
    location: "South West",
    image: "./hotel7.jpg",
  },
  {
    name: "Hotel Comforte Stay",
    avg_rating: 8.7,
    location: "Pahargunj",
    image: "./hotel8.jpg",
  },
  {
    name: "Treebo Tryst Relax Inn",
    avg_rating: 8.7,
    location: "Patel Nagar",
    image: "./hotel9.jpg",
  },
  {
    name: "Woodpecker Apartments",
    avg_rating: 8.6,
    location: "Hauz Khas",
    image: "./hotel10.jpg",
  },
];

const Popular = () => {
  return (
    <div className="bg-white min-h-screen py-24 px-4 sm:px-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">
          Popular Hotels
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          The Top 10 Most Popular Hotels based on their average rating and amount of reviews!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularHotels.map((hotel, index) => (
          <div
            key={index}
            className="bg-blue-950 text-white rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-200"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-white">
                <HiMiniBuildingOffice2 size={35} className="text-red-100" />
                <span className="text-lg font-semibold">{hotel.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <FaMapMarkerAlt className="text-blue-300" />
                <span>{hotel.location}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <FaStar className="text-yellow-400" />
                <span className="text-md font-medium">{hotel.avg_rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Popular;
