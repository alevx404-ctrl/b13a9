"use client";
import { useEffect, useState } from "react";
import FacilityCard from "../../components/shared/FacilityCard";

const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities`)
      .then((res) => res.json())
      .then((data) => setFacilities(data))
      .catch((err) => console.error("Error fetching facilities:", err));
  }, []);

  return (
    <section className="bg-[#111827] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#22C55E] text-xs font-bold uppercase tracking-widest">
            Featured Facilities
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight mt-2">
            Discover Top Sports Venues
          </h2>

          <p className="text-[#F8FAFC]/60 max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
            Book premium sports facilities for football, badminton, swimming,
            basketball, tennis, and more instantly.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.slice(0, 6).map((facility) => (
            <FacilityCard
              key={facility._id || facility.id}
              facility={facility}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedFacilities;