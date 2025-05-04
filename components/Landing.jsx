import React from "react";

const Landing = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Plan, Book, and Manage Group Trips Effortlessly
          </h1>
          <p className="text-lg md:text-2xl text-gray-600 mb-8">
            The all-in-one platform for travel organizers and participants.
          </p>
          <a
            href="#"
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">🌍</div>
              <h3 className="font-bold text-xl mb-2">Easy Trip Planning</h3>
              <p className="text-gray-600">
                Organize itineraries, bookings, and payments in one place.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">💳</div>
              <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Collect and manage payments securely from all participants.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <div className="text-blue-600 text-4xl mb-4">🤝</div>
              <h3 className="font-bold text-xl mb-2">Collaborative Tools</h3>
              <p className="text-gray-600">
                Communicate and collaborate with your group seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ... add more sections as needed ... */}
    </div>
  );
};

export default Landing;