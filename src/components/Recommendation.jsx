import React, { useState, useEffect } from "react";

const Recommendation = () => {
  const [formData, setFormData] = useState({
    area: "",
    minRating: "",
  });

  const [areas, setAreas] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch areas on load
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/areas/");
        if (!response.ok) throw new Error("Failed to load area list");
        const data = await response.json();
        setAreas(data);
      } catch (err) {
        console.error("Error fetching areas:", err);
        setAreas([]);
      }
    };

    fetchAreas();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const areaEncoded = encodeURIComponent(formData.area);
      const minRating = formData.minRating;
      const response = await fetch(
        `http://localhost:8000/api/recommendations/?area=${areaEncoded}&min_rating=${minRating}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-24 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-900">
          Hotel Recommender
        </h1>
        <p className="text-gray-600 mt-2 text-lg">
          Get personalized hotel suggestions based on your preferences.
        </p>
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Area Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Area
              </label>
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Choose Area</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Minimum Rating (out of 10)
              </label>
              <input
                type="number"
                name="minRating"
                value={formData.minRating}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                placeholder="e.g. 8.5"
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Get Recommendation
            </button>
          </form>
        </div>

        {/* Right: Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="./recform.avif"
            alt="Hotel Visual"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Results Card */}
      <div className="max-w-5xl w-full mt-8 bg-white rounded-2xl shadow-2xl p-8">
        {loading && <p>Loading recommendations...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {recommendations.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Recommended Hotels:</h2>
            <ul className="space-y-3 max-h-96 overflow-y-auto">
              {recommendations.map((hotel, idx) => (
                <li
                  key={idx}
                  className="border border-gray-200 rounded-md p-4 shadow-sm"
                >
                  <h3 className="font-bold text-lg">{hotel.Name}</h3>
                  <p className="text-gray-600">{hotel.Area}</p>
                  <p className="text-blue-700 font-semibold">
                    Rating: {hotel["Rating(Out of 10)"]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!loading && !error && recommendations.length === 0 && (
          <p>No recommendations yet.</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
