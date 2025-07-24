import Image from "next/image";

function ImageTextSection({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  body,
  imgOnLeft = false,
}) {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className={`flex flex-col lg:flex-row items-center gap-10 ${
            imgOnLeft ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Image Side */}
          <div className="flex-1 relative">
            <div className="relative group">
              {/* Decorative Elements */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-15 blur-md group-hover:opacity-25 transition-opacity duration-500"></div>
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-15 blur-lg"></div>

              <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-2xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  layout="fill"
                  objectFit="cover"
                  className="transition-all duration-500 opacity-80"
                  sizes="(max-width: 768px) 80vw, 40vw"
                />
                {/* Grain Overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 256 256%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.3%22/%3E%3C/svg%3E')]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Stats Card with Frosted Glass */}
              <div className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">
                      Smart Planning
                    </p>
                    <p className="text-xs text-white/70">AI-Powered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex-1 space-y-6">
            {subtitle && (
              <div className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                <span className="text-blue-700 font-medium text-xs">
                  {subtitle}
                </span>
              </div>
            )}

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    index === title.split(" ").length - 1
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                      : ""
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </h2>

            <div className="prose prose-base text-gray-600 leading-relaxed">
              {body}
            </div>

            {/* Feature Points with Frosted Glass */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {["Instant Results", "Smart Recommendations", "Real-time Updates", "Budget Tracking"].map(
                (feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center space-x-2 p-2.5 bg-white/30 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/40 transition-all duration-200"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <span className="font-medium text-gray-700 text-sm">
                      {feature}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageTextSection;
