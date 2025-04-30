import React from "react";

const partners = [
  {
    imagePath:
      "/images/partners/strava/api_logo_cptblWith_strava_stack_orange.png",
    alt: "Compatible with Strava",
  },
  // {
  //   imagePath: "/images/partners/garmin/garmin-logo.png",
  //   alt: "Compatible with Garmin",
  // },
  // {
  //   imagePath: "/images/partners/apple/apple-watch-logo.png",
  //   alt: "Compatible with Apple Watch",
  // },
  // {
  //   imagePath: "/images/partners/fitbit/fitbit-logo.png",
  //   alt: "Compatible with Fitbit",
  // },
];

const Partners: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
          Compatible with
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={partner.imagePath}
                alt={partner.alt}
                className="w-full h-auto max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
