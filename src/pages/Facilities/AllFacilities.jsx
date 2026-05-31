"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, Loader2, Sparkles, Inbox } from "lucide-react";
import FacilityCard from "@/components/shared/FacilityCard";

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [filteredFacilities, setFilteredFacilities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/facilities`)
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setFilteredFacilities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching facilities:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = facilities;

    if (searchQuery) {
      result = result.filter((f) =>
        f.facilityName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType !== "All") {
      result = result.filter((f) => f.facilityType === selectedType);
    }

    setFilteredFacilities(result);
  }, [searchQuery, selectedType, facilities]);

  const uniqueTypes = ["All", ...new Set(facilities.map((f) => f.facilityType).filter(Boolean))];

  return (
    <section className="min-h-screen bg-[#111827] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-16">
          <p className="text-[#22C55E] text-xs font-bold uppercase tracking-[0.3em] inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> Marketplace
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#F8FAFC] mt-3 tracking-tight">
            Explore All Arenas
          </h1>
          <p className="text-[#F8FAFC]/60 max-w-2xl mx-auto mt-4 text-sm sm:text-base leading-relaxed">
            Browse and reserve premium football turfs, badminton courts, swimming lanes, and fitness studios across the city with real-time slot confirmations.
          </p>
        </div>

        {/* Interactive Search & Filter Control Hub */}
        <div className="bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 p-5 rounded-2xl mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between shadow-2xl backdrop-blur-sm">
          
          {/* Search Box Inputs */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F8FAFC]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by venue name or location..."
              className="w-full pl-11 pr-4 py-3 bg-[#111827]/60 border border-[#F8FAFC]/10 rounded-xl text-sm text-[#F8FAFC] placeholder-[#F8FAFC]/30 focus:outline-none focus:ring-2 focus:ring-[#22C55E] focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Quick Category Quick-Select Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs text-[#F8FAFC]/40 font-semibold uppercase tracking-wider mr-2 shrink-0">
              <SlidersHorizontal className="h-3.5 w-3.5 text-[#22C55E]" />
              Filter:
            </div>
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide border transition-all duration-200 shrink-0 ${
                  selectedType === type
                    ? "bg-[#22C55E] text-[#111827] border-[#22C55E] shadow-lg shadow-[#22C55E]/10"
                    : "bg-[#111827]/40 text-[#F8FAFC]/60 border-[#F8FAFC]/10 hover:text-[#F8FAFC] hover:bg-[#F8FAFC]/5"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Display Matrix Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="h-8 w-8 text-[#22C55E] animate-spin" />
            <p className="text-[#F8FAFC]/50 text-sm font-medium tracking-wide">
              Fetching available court matrices...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFacilities.map((facility) => (
                <FacilityCard
                  key={facility._id || facility.id}
                  facility={facility}
                />
              ))}
            </div>

            {/* Premium Empty State Display Layout */}
            {filteredFacilities.length === 0 && (
              <div className="text-center py-24 bg-[#F8FAFC]/5 border border-dashed border-[#F8FAFC]/10 rounded-2xl max-w-xl mx-auto flex flex-col items-center justify-center p-8 shadow-inner">
                <div className="p-4 bg-[#111827]/60 border border-[#F8FAFC]/10 rounded-2xl text-[#22C55E]/60 mb-4 shadow-xl">
                  <Inbox className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#F8FAFC] tracking-tight">
                  No Arenas Match Your Search
                </h3>
                <p className="text-[#F8FAFC]/50 mt-2 text-sm max-w-xs mx-auto leading-relaxed">
                  We couldn't find matches for your criteria. Try adjustments to your spelling keywords or select alternative filter tags.
                </p>
                <button 
                  onClick={() => { setSearchQuery(""); setSelectedType("All"); }}
                  className="mt-5 px-5 py-2 rounded-xl bg-[#F8FAFC]/5 border border-[#F8FAFC]/10 hover:bg-[#F8FAFC]/10 text-[#F8FAFC] text-xs font-bold tracking-wide transition-all duration-200"
                >
                  Reset Parameters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllFacilities;