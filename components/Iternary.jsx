export const Iternary = ({ itinerary, handlePrint , printRef }) => {
  if (!itinerary) return null;
  return (
    <div>
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg">
        <div className="bg-purple-400 p-4 sm:p-8 text-white">
          <div className="flex flex-col gap-4 mb-4">
            <div>
              <h2 className="text-lg sm:text-2xl font-semibold mb-2">
                Your Personalized Itinerary
              </h2>
              <p className="text-white/80 text-sm sm:text-base">
                Crafted with AI precision for your perfect journey
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="self-start flex items-center px-4 sm:px-6 py-2 sm:py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-all duration-200 border border-white/20 text-sm"
            >
              <span className="mr-2">📄</span>
              Print PDF
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8 bg-white/5 backdrop-blur-sm" ref={printRef}>
                  <div className="text-center mb-12 sm:mb-16 pb-6 sm:pb-8 border-b border-white/20">
                    <h2 className="text-xl sm:text-3xl font-bold mb-4 text-purple-800">
                      {itinerary.overview.title}
                    </h2>
                    {itinerary.overview.subtitle && (
                      <p className="text-base sm:text-lg text-gray-700 mb-4 font-medium">
                        {itinerary.overview.subtitle}
                      </p>
                    )}
                    <div className="inline-flex items-center gap-2 sm:gap-4 rounded-full bg-amber-300 text-white px-4 sm:px-6 py-1 shadow-lg border border-white/20 text-sm sm:text-base font-semibold">
                      <span>
                        {itinerary.overview.duration}
                      </span>
                      <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
                      <span>
                        {itinerary.overview.dates}
                      </span>
                    </div>
                  </div>

                  {/* Destinations */}
          {itinerary.destinations.map((dest, destIdx) => (
            <div key={destIdx} className="mb-20 last:mb-0">
              {/* Destination Header */}
              <div className="mb-6 pb-6 border-b border-white/20">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold text-purple-800">
                    {dest.city}, {dest.country}
                  </h3>
                  <div className="inline-flex items-center px-4 py-2 bg-blue-400 text-white rounded-full text-sm font-semibold">
                    Days {dest.daysRange.replace(/[^0-9\-]/g, "")}
                  </div>
                </div>
              </div>

              {/* Two-column Layout */}
              <div className="grid lg:grid-cols-2 gap-12 mb-12">
                {/* Destination Info */}
                <div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {dest.description}
                  </p>
                </div>

                {/* Accommodation */}
                <div>
                  <h4 className="text-lg font-semibold mb-6 text-purple-800 flex items-center">
                    <span className="mr-2">🏨</span>
                    Accommodation
                  </h4>
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden border border-white/30">
                    {dest.hotel.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={dest.hotel.imageUrl}
                          alt={dest.hotel.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/600x400?text=Hotel+Image";
                          }}
                        />
                        {/* Grain overlay for hotel images too */}
                        <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 256 256%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.3%22/%3E%3C/svg%3E')]"></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h5 className="text-lg font-semibold mb-4 text-purple-800">
                        {dest.hotel.name}
                      </h5>
                      <div className="space-y-3 mb-6">
                        {dest.hotel.stayDates && (
                          <div className="flex items-center text-gray-700 text-sm">
                            <span className="mr-2">📅</span>
                            <span className="font-medium">
                              {dest.hotel.stayDates}
                            </span>
                          </div>
                        )}
                        {dest.hotel.address && (
                          <div className="flex items-start text-gray-700 text-sm">
                            <span className="mr-2 mt-0.5">📍</span>
                            <span>{dest.hotel.address}</span>
                          </div>
                        )}
                        {dest.hotel.rating && (
                          <div className="flex items-center">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-sm ${
                                    i < Math.floor(dest.hotel.rating)
                                      ? "text-yellow-400"
                                      : "text-gray-400"
                                  }`}
                                >
                                  ⭐
                                </span>
                              ))}
                            </div>
                            <span className="text-gray-700 font-medium text-sm">
                              {dest.hotel.rating}/5
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div>
                          {dest.hotel.pricePerNight && (
                            <div className="text-lg font-bold text-purple-800">
                              {dest.hotel.pricePerNight}
                            </div>
                          )}
                          {dest.hotel.totalPrice && (
                            <div className="text-sm text-gray-600">
                              {dest.hotel.totalPrice} total
                            </div>
                          )}
                        </div>
                        {dest.hotel.websiteUrl && (
                          <a
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            href={dest.hotel.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm"
                          >
                            <span className="mr-2">🔗</span>
                            Book Now
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Itinerary */}
              <div className="mb-12">
                <h4 className="text-lg font-semibold mb-8 text-purple-800 flex items-center">
                  <span className="mr-2">📅</span>
                  Daily Itinerary
                </h4>
                <div className="space-y-6">
                  {dest.schedule.map((day, dayIdx) => (
                    <div
                      key={dayIdx}
                      className="bg-white/20 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/30"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="bg-cyan-400 text-white font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base">
                            Day {day.dayNumber}
                          </div>
                          <span className="text-gray-700 font-medium text-sm sm:text-base">
                            {day.date}
                          </span>
                        </div>
                      </div>
                      {day.description && (
                        <div className="font-medium mb-4 sm:mb-6 text-purple-800 bg-white/30 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-white/40 text-sm sm:text-base">
                          {day.description}
                        </div>
                      )}
                      {day.scheduleItems && day.scheduleItems.length > 0 && (
                        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                          {day.scheduleItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="bg-white/30 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/40"
                            >
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-start justify-between mb-2 sm:mb-3">
                                <div className="flex items-center gap-2 sm:gap-3">
                                  <span className="">
                                    {item.time}
                                  </span>
                                  <h6 className="font-semibold text-purple-800 text-sm sm:text-base">
                                    {item.activity}
                                  </h6>
                                  {item.location && (
                                    <span className="text-gray-600 text-xs sm:text-sm bg-white/40 backdrop-blur-sm px-2 py-1 rounded-full border border-white/50">
                                      {item.location}
                                    </span>
                                  )}
                                </div>
                                <div>
                                  <span className="font-semibold text-cyan-600 text-xs sm:text-sm">
                                    {item.cost}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 leading-relaxed pl-0 sm:pl-16 text-xs sm:text-base">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-end pt-3 sm:pt-4 border-t border-white/30">
                        <div className="bg-white/40 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border border-white/50">
                          <span className="text-gray-700 font-medium text-sm sm:text-base">
                            Daily Total:{" "}
                          </span>
                          <span className="font-bold text-cyan-600 text-sm sm:text-base">
                            {day.dailyCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Total Cost */}
          {itinerary.approxTotalCost && (
            <div className="mt-16 text-center">
              <div className="inline-block bg-blue-800 p-8 rounded-xl text-white">
                <h3 className="text-lg font-semibold mb-2">
                  Total Estimated Cost
                </h3>
                <p className="text-2xl font-bold">
                  {itinerary.approxTotalCost}
                </p>
                <p className="text-white/80 mt-2 text-sm">
                  *Prices are approximate and may vary
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
