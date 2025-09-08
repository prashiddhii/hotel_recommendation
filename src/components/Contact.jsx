import React, { useState } from "react";
import { TbSend } from "react-icons/tb";

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "d8c19d0f-e5db-4d17-981d-b8753c010295");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log(result); // 👈 log result for debugging

      if (result.success) {
        setIsSent(true);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="min-h-screen bg-[#1A1A2E] flex flex-col items-center text-white relative py-12"
    >
      <h1 className="poppins mb-12 font-bold text-3xl">CONTACT</h1>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left side: Image */}
          <div className="px-4 md:px-8 flex flex-col items-center md:items-start gap-4">
            <img
              src="/mail.svg"
              alt="contact"
              className="w-[250px] sm:w-[300px] md:w-[350px] lg:w-[400px]"
            />
          </div>

          {/* Right side: Contact Form */}
          <div className="w-full max-w-md mx-auto">
            {isSent ? (
              <p className="text-green-400 text-center text-xl">
                Thank you! Your message has been sent.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <p className="text-sm poppins">Full Name:</p>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="p-3 rounded-lg bg-gray-700 text-white border-2 border-gray-400 focus:outline-none hover:outline:bg-gray-600 mb-8"
                />
                <p className="text-sm poppins">Email:</p>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="p-3 rounded-lg bg-gray-700 border-2 border-gray-400 text-white focus:outline-none mb-8"
                />
                <p className="text-sm poppins">Message:</p>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  className="p-3 rounded-lg bg-gray-700 border-2 border-gray-400 text-white focus:outline-none mb-8"
                />
                {error && <p className="text-red-400 text-center">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-white hover:bg-gray-200 cursor-pointer w-44 text-black font-semibold py-4 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <TbSend size={20} />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
